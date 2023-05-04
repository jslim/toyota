import cloneDeep from 'lodash.clonedeep';

import {
  ContentfulOptions,
  EntityMap,
  FilteredEntity,
  GenericEntity,
  GenericObject,
  Locale,
  Response,
  Sys
} from '@/data/types';

const UNRESOLVED_LINK = {}; // unique object to avoid polyfill bloat using Symbol()

export const makeFilteredEntity = (entity: GenericEntity): FilteredEntity => {
  if (entity == null) {
    return {
      fields: {},
      contentType: 'null',
      id: '',
      locale: Locale.EN
    };
  }
  const isEntry = entity?.sys?.type === 'Entry';
  return {
    // Ensure we keep original object references intact, DON'T spread/clone here
    fields: entity.fields!,
    // Creating a "content type" for any assets so component/page builder has consistent structure
    contentType: isEntry ? entity?.sys?.contentType?.sys?.id! : 'contentfulAssetEntity',
    id: entity?.sys?.id!,
    locale: entity?.sys?.locale || Locale.EN
  };
};

/**
 * isLink Function
 * Checks if the object has sys.type "Link"
 * @param {GenericObject} object - Arbitrary object to check
 */
const isLink = (object: GenericObject): boolean => object && object.sys && object.sys.type === 'Link';

/**
 * Creates a string key for lookup in entityMap
 *
 * @param {Sys} sys
 * @param {String} sys.type
 * @param {String} sys.id
 * @return {String}
 */
const makeLookupKey = (sys: Sys): string => `${sys.type}!${sys.id}`;

/**
 * Fetches linked entity from our entity map or empty object if link unresolved.
 *
 * @param {EntityMap} entityMap - Map with all included entities
 * @param {GenericEntity} link - Linked entity
 * @return {object}
 */
const getLink = (entityMap: EntityMap, link: GenericEntity): object => {
  const { linkType: type, id } = link.sys;
  const lookupKey = makeLookupKey({ type, id });

  return entityMap.get(lookupKey) || UNRESOLVED_LINK;
};

/**
 * cleanUpLinks Function
 * - Removes unresolvable links from Arrays and Objects
 *
 * @param {Object[]|Object} input
 */
const cleanUpLinks = (input: GenericObject) => {
  if (Array.isArray(input)) {
    return input.filter((val) => val !== UNRESOLVED_LINK);
  }
  for (const key in input) {
    if (input[key] === UNRESOLVED_LINK) {
      delete input[key];
    }
  }
  return input;
};

/**
 * walkMutate Function
 *
 * Recursively "walks" through object checking against the predicate function
 * and returning a mutated object based on that outcome.
 *
 * In this case we're checking if the current object is a "Link" and replacing
 * it with the actual linked content found in our EntityMap of linked content.
 *
 * @param input
 * @param predicate
 * @param mutator
 * @return {GenericObject | GenericEntity}
 */
const walkMutate = (
  input: GenericObject,
  predicate: (object: GenericObject) => boolean,
  mutator: (object: GenericObject) => GenericObject,
  removeUnresolved: ContentfulOptions['removeUnresolved']
): GenericObject => {
  if (predicate(input)) {
    return mutator(input);
  }

  if (input && typeof input === 'object') {
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        input[key] = walkMutate(input[key], predicate, mutator, removeUnresolved);
      }
    }
    if (removeUnresolved) {
      input = cleanUpLinks(input);
    }
  }
  return input;
};

/**
 * Mutator function to resolve and normalize a linked Entity.
 */
const normalizeLink = (entityMap: EntityMap, link: GenericObject, removeUnresolved: boolean) => {
  const resolvedLink = getLink(entityMap, link as GenericEntity);
  if (resolvedLink === UNRESOLVED_LINK) {
    return removeUnresolved ? resolvedLink : link;
  }
  return resolvedLink;
};

const makeEntryObject = (item: GenericObject, itemEntryPoints: ContentfulOptions['itemEntryPoints']) => {
  if (!Array.isArray(itemEntryPoints)) {
    return item;
  }

  const entryPoints = Object.keys(item).filter((ownKey) => itemEntryPoints.indexOf(ownKey) !== -1);

  return entryPoints.reduce((entryObj: GenericObject, entryPoint) => {
    entryObj[entryPoint] = item[entryPoint];
    return entryObj;
  }, {});
};

/**
 * Create entity map with extra object fields filtered out from entries.
 *
 * @param allEntries Main entry and all linked entries within the includes response field
 * @returns Entity map with simplified object structure for parsing
 */
const getEntityMap = (allEntries: GenericEntity<GenericObject>[]): EntityMap => {
  return new Map(allEntries.map((entity) => [makeLookupKey(entity.sys), makeFilteredEntity(entity)]));
};

/**
 * resolveResponse Function
 * Resolves contentful response to normalized form.
 * @param {Object} response Contentful response
 * @param {Object} options
 * @param {Boolean} options.removeUnresolved - Remove unresolved links default:false
 * @param {Array<String>} options.itemEntryPoints - Resolve links only in those item properties
 * @return {Object}
 */
const resolveResponse = (
  response: Response,
  options: ContentfulOptions = { removeUnresolved: false }
): Response['items'] => {
  options = options || {};
  if (!response.items) {
    return [];
  }
  const responseClone = cloneDeep(response);
  const allIncludes = Object.keys(responseClone.includes || {}).reduce(
    (all: Array<GenericEntity>, type: string) => [...all, ...response.includes![type]],
    []
  );

  const allEntries = [...responseClone.items, ...allIncludes];

  const entityMap = getEntityMap(allEntries);

  allEntries.forEach((item) => {
    const entryObject = makeEntryObject(item, options.itemEntryPoints);

    Object.assign(
      item,
      walkMutate(
        entryObject,
        isLink,
        (link: GenericObject) => normalizeLink(entityMap, link, options.removeUnresolved),
        options.removeUnresolved
      )
    );
  });

  return responseClone.items;
};

export default resolveResponse;
