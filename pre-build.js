require('dotenv').config({ path: './.env' });
const path = require('path');
const https = require('https');
const fs = require('fs');

const targetFolder = './src/json';
const urlPrefix = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`;

function convertParamsToQueryString(params) {
  return Object.entries(params).reduce((queryString, [key, value], index) => {
    if (value === undefined) {
      return queryString;
    }
    return `${queryString}${index === 0 ? '?' : '&'}${key}=${value}`;
  }, '');
}

const contentfulFetch = (urlSuffix = '', params = {}) => {
  const queryParams = { access_token: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN, include: 2, ...params };
  return new Promise((resolve, reject) => {
    return https.get(`${urlPrefix}${urlSuffix}` + convertParamsToQueryString(queryParams), (response) => {
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(returnData));
      });
      response.on('error', (error) => {
        reject(error);
      });
    });
  });
};

const getEntriesByContentType = async (contentType, { ...restParams }) => {
  return await contentfulFetch(`/entries`, {
    content_type: contentType,
    ...restParams
  });
};

// Sanity check to make sure folder is created
if (!fs.existsSync(targetFolder)) {
  console.log('Creating json folder');
  fs.mkdirSync(targetFolder);
}

getEntriesByContentType('ourLatestPagePost', { include: 10, limit: 1000 }).then((data) => {
  data.items.sort((a, b) => {
    const first = new Date(a.fields.publishDate).getTime();
    const second = new Date(b.fields.publishDate).getTime();
    return second - first;
  });

  fs.writeFile(path.join(targetFolder, 'our-latest-posts-en.json'), JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Our Latest posts in English written to file');
  });
});

getEntriesByContentType('ourLatestPagePost', { include: 10, locale: 'ja-JP', limit: 1000 }).then((data) => {
  data.items.sort((a, b) => {
    const first = new Date(a.fields.publishDate).getTime();
    const second = new Date(b.fields.publishDate).getTime();
    return second - first;
  });
  fs.writeFile(path.join(targetFolder, 'our-latest-posts-jp.json'), JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Our Latest posts in Japanese written to file');
  });
});
