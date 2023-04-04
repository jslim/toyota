/* eslint-disable react/display-name */
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';

import { APIContentful } from '@/data/API';
import { hideStaticHtml } from '@/data/settings';
import { GlobalData, Lang } from '@/data/types';

import { getLocaleByLang } from '@/utils/locales';
import { globalDataParserUtil } from '@/utils/parsers/global-data-parser-util';
import sanitizer from '@/utils/sanitizer';

// if JS is available we hide the page immediately to prevent static content flash.
const hideStaticHtmlScript = `
  if (typeof window !== 'undefined') document.documentElement.classList.add('hide-static-html');
`;

type ExtendedDocumentInitialProps = DocumentInitialProps & {
  globalData?: GlobalData;
};

class MyDocument extends Document<ExtendedDocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const accessToken = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const apiContentful = new APIContentful({ isPreview: false, spaceId, accessToken });
    const originalRenderPage = ctx.renderPage;

    const [globalDataResponseEn, globalDataResponseJp] = await Promise.all([
      apiContentful.getEntryBySlug('global-data', 'globalData', {
        include: 2,
        locale: getLocaleByLang(Lang.EN)
      }),
      apiContentful.getEntryBySlug('global-data', 'globalData', {
        include: 2,
        locale: getLocaleByLang(Lang.JP)
      })
    ]);

    const globalData: GlobalData = {
      [Lang.EN]: globalDataParserUtil(globalDataResponseEn.fields),
      [Lang.JP]: globalDataParserUtil(globalDataResponseJp.fields)
    };

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        enhanceApp: (App: any) => (props) => <App {...props} globalData={globalData} />
      });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, globalData };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        {hideStaticHtml && (
          <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: sanitizer(hideStaticHtmlScript) }} />
        )}
        <body>
          <Main />
          <script
            id="__GLOBAL_DATA__"
            type="application/json"
            crossOrigin="anonymous"
            dangerouslySetInnerHTML={{
              __html: sanitizer(JSON.stringify(this.props.globalData))
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
