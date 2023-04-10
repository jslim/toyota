import resolveResponse from '@/utils/parsers/response-parser-util';
import { makeFilteredEntity } from '@/utils/parsers/response-parser-util';

function convertParamsToQueryString(params: {}) {
  return Object.entries(params).reduce((queryString, [key, value], index) => {
    if (value === undefined) {
      return queryString;
    }
    return `${queryString}${index === 0 ? '?' : '&'}${key}=${value}`;
  }, '');
}

/**
 * Utility class for interacting with the Contentful API. Provides helper functions for various common requests.
 */
export class APIContentful {
  urlPrefix: string;
  accessToken: string;
  /**
   * Creates API helper.
   *
   */
  constructor({ isPreview = false, spaceId = '', envId = process.env.CONTENTFUL_ENVIRONMENT, accessToken = '' } = {}) {
    if (!spaceId) {
      throw Error(`No "spaceId" provided`);
    }

    if (!accessToken) {
      throw Error(`No "accessToken" provided`);
    }

    this.accessToken = accessToken;

    const endpoint = isPreview ? 'preview.contentful' : 'cdn.contentful';
    this.urlPrefix = `https://${endpoint}.com/spaces/${spaceId}/environments/${envId}`;
  }

  /**
   * Base fetching function.
   *
   * @param {string} urlSuffix - String for specific subpath endpoint to query.
   * @param {object} params - Object with query params to search/filter items.
   * @returns Resolved response object.
   */
  contentfulFetch = (urlSuffix = '', params = {}) => {
    const queryParams = { access_token: this.accessToken, include: 2, ...params };
    return fetch(`${this.urlPrefix}${urlSuffix}` + convertParamsToQueryString(queryParams))
      .then((response) => response.json())
      .then((response) => {
        if (response.items && response.includes) {
          response.items = resolveResponse(response);
        }
        return response;
      });
  };

  getEntryById = async (entryId: string, params = {}) => {
    const response = await this.contentfulFetch(`/entries`, {
      limit: 1,
      'sys.id[in]': entryId,
      ...params
    });
    return makeFilteredEntity(response?.items?.[0]);
  };

  getEntryBySlug = async (slug: string, contentType: string, params = {}) => {
    const response = await this.contentfulFetch(`/entries`, {
      content_type: contentType,
      limit: 1,
      'fields.slug[in]': slug,
      ...params
    });
    return makeFilteredEntity(response?.items?.[0]);
  };

  getContentModelById = async (contentTypeId: string) => {
    const response = await this.contentfulFetch(`/content_types/${contentTypeId}/`);
    return response.fields;
  };

  getEntriesByContentType = async (contentType: string, { limit = 12, page = 1, ...restParams }) => {
    return await this.contentfulFetch(`/entries`, {
      content_type: contentType,
      limit,
      skip: limit * (page - 1),
      ...restParams
    });
  };

  getAssets = async (titleMatch: string) => {
    return await this.contentfulFetch(`/assets`, {
      limit: 1000,
      'fields.title[match]': titleMatch,
      order: 'fields.file.fileName'
    });
  };
}
