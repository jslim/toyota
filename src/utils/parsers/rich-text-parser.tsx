import { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';

// import { ContentfulImageAsset } from '@/data/types';

// import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';

type ContentfulNodeType = {
  data: {
    uri?: string;
  };
};

// type ContentfulImageNodeType = {
//   nodeType: string;
//   data: {
//     target: ContentfulImageAsset;
//   };
// };

export const parseContentfulRichText = (richText: Document, className?: string): ReactNode => {
  const renderOptions = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: ContentfulNodeType, children: ReactNode) =>
        node.data.uri?.includes('mailto') ? (
          <a className={className} href={node.data.uri}>
            {children}
          </a>
        ) : (
          <a className={className} href={node.data.uri} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      [BLOCKS.PARAGRAPH]: (_node: ContentfulNodeType, children: ReactNode) => <p className={className}>{children}</p>,
      [BLOCKS.HEADING_1]: (_node: ContentfulNodeType, children: ReactNode) => <h1 className={className}>{children}</h1>,
      [BLOCKS.HEADING_2]: (_node: ContentfulNodeType, children: ReactNode) => <h2 className={className}>{children}</h2>,
      [BLOCKS.HEADING_3]: (_node: ContentfulNodeType, children: ReactNode) => <h3 className={className}>{children}</h3>,
      [BLOCKS.HEADING_4]: (_node: ContentfulNodeType, children: ReactNode) => <h4 className={className}>{children}</h4>,
      [BLOCKS.HEADING_5]: (_node: ContentfulNodeType, children: ReactNode) => <h5 className={className}>{children}</h5>,
      [BLOCKS.HEADING_6]: (_node: ContentfulNodeType, children: ReactNode) => <h6 className={className}>{children}</h6>,
      [BLOCKS.UL_LIST]: (_node: ContentfulNodeType, children: ReactNode) => <ul className={className}>{children}</ul>,
      [BLOCKS.OL_LIST]: (_node: ContentfulNodeType, children: ReactNode) => <ol className={className}>{children}</ol>

      // [BLOCKS.EMBEDDED_ASSET]: (node: ContentfulImageNodeType) => {
      //   console.log('ndoe: ', node);
      //   return (
      //     node.nodeType === 'embedded-asset-block' && (
      //       <ContentfulImage className={className} asset={node.data.target || undefined} />
      //     )
      //   );
      // }
    }
  };

  return documentToReactComponents(richText, renderOptions);
};
