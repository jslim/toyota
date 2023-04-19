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
