import { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';

import { FilteredEntity } from '@/data/types';
import { ContentfulImageAsset } from '@/data/types';

import BaseLink, { Target } from '@/components/BaseLink/BaseLink';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';

import { getPageBlocks } from './get-page-blocks';

type ContentfulNodeType = {
  data: {
    uri?: string;
  };
};

type ContentfulEmbeddedNodeType = {
  data: { target?: FilteredEntity };
};

type ContentfulImageNodeType = {
  nodeType: string;
  data: {
    target?: ContentfulImageAsset;
  };
};

export const parseContentfulRichText = (richText: Document, className?: string): ReactNode => {
  const renderOptions = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: ContentfulNodeType, children: ReactNode) => (
        <BaseLink className={className} target={Target.BLANK} href={node.data.uri}>
          {children}
        </BaseLink>
      ),
      [BLOCKS.PARAGRAPH]: (_node: ContentfulNodeType, children: ReactNode) => <p className={className}>{children}</p>,
      [BLOCKS.HEADING_1]: (_node: ContentfulNodeType, children: ReactNode) => <h1 className={className}>{children}</h1>,
      [BLOCKS.HEADING_2]: (_node: ContentfulNodeType, children: ReactNode) => <h2 className={className}>{children}</h2>,
      [BLOCKS.HEADING_3]: (_node: ContentfulNodeType, children: ReactNode) => <h3 className={className}>{children}</h3>,
      [BLOCKS.HEADING_4]: (_node: ContentfulNodeType, children: ReactNode) => <h4 className={className}>{children}</h4>,
      [BLOCKS.HEADING_5]: (_node: ContentfulNodeType, children: ReactNode) => <h5 className={className}>{children}</h5>,
      [BLOCKS.HEADING_6]: (_node: ContentfulNodeType, children: ReactNode) => <h6 className={className}>{children}</h6>,
      [BLOCKS.UL_LIST]: (_node: ContentfulNodeType, children: ReactNode) => <ul className={className}>{children}</ul>,
      [BLOCKS.OL_LIST]: (_node: ContentfulNodeType, children: ReactNode) => <ol className={className}>{children}</ol>,
      [BLOCKS.EMBEDDED_ENTRY]: (node: ContentfulEmbeddedNodeType) => {
        const entity = node?.data?.target;
        return entity && getPageBlocks(entity);
      },
      [INLINES.EMBEDDED_ENTRY]: (node: ContentfulEmbeddedNodeType) => {
        const entity = node?.data?.target;
        return entity && getPageBlocks(entity);
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: ContentfulImageNodeType) => {
        const imageAsset = node.data.target;
        return imageAsset && <ContentfulImage className={className} asset={imageAsset} />;
      }
    }
  };

  return documentToReactComponents(richText, renderOptions);
};
