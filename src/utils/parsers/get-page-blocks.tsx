import { FilteredEntity } from '@/data/types';

import {
  buildAccordionGroup,
  buildAccordionItem,
  buildContentfulImage,
  buildImageBlock,
  buildNextChapter,
  buildSectionWrapper,
  buildTabGroup,
  buildTabItem,
  ComponentBuilderFactory
} from './block-builders';

// Key should be the content type ID set in Contentful
const componentFactories: { [key: string]: ComponentBuilderFactory } = {
  nextChapter: buildNextChapter,
  accordionItem: buildAccordionItem,
  accordionGroup: buildAccordionGroup,
  section: buildSectionWrapper,
  tabGroup: buildTabGroup,
  tabItem: buildTabItem,
  // We can build an image from either a reference ImageBlock or a direct linked Asset
  contentfulAssetEntity: buildContentfulImage,
  imageBlock: buildImageBlock
};

/**
 * Walks through a FilteredEntity object and builds up component structure based on each entity's content type.
 *
 * @param entry - FilteredEntity to recursively build out
 * @returns - Component to render
 */
export const getPageBlocks = (entry: FilteredEntity): JSX.Element | null => {
  const { contentType, fields } = entry;
  if (!contentType || !componentFactories[contentType]) return null;

  const { props, component: Component, childrenFields } = componentFactories[contentType](entry.fields);
  let Children: Array<JSX.Element | null | string> = [];

  // Array of referenced children items to build recursively
  if (fields.innerBlocks && Array.isArray(fields.innerBlocks)) {
    Children = fields.innerBlocks.map((block: FilteredEntity) => getPageBlocks(block));
  }

  // Specific fields set in the current ComponentBuilder that should be passed as children instead of a prop.
  if (childrenFields) Children.push(...childrenFields);

  return (
    <Component {...props} key={(Math.random() * 1000).toFixed(3)}>
      {Children}
    </Component>
  );
};
