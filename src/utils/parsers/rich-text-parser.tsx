import { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Block, BLOCKS, Document, Inline, INLINES } from '@contentful/rich-text-types';

import BaseLink, { Target } from '@/components/BaseLink/BaseLink';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

import { getPageBlocks } from './get-page-blocks';

/**
 * Utility method to check if node contains "inline" entries and removing
 * wrapping paragraph if so. This is used primarily for adding content nested
 * within tables as the tables default to rendering a pargaph for any table cell
 * content.
 *
 * @param node Pargaraph node to check against.
 * @returns boolean
 */
const hasInlineEntry = (node: Block | Inline) => {
  let shouldWrap = false;
  node.content.forEach((node) => {
    if (node.nodeType === INLINES.EMBEDDED_ENTRY) shouldWrap = true;
  });
  return shouldWrap;
};

export const parseContentfulRichText = (richText: Document, className?: string): ReactNode => {
  const renderOptions = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: Inline | Block, children: ReactNode) => (
        <BaseLink className={className} target={Target.BLANK} href={node.data.uri}>
          {children}
        </BaseLink>
      ),
      [BLOCKS.PARAGRAPH]: (node: Inline | Block, children: ReactNode) => {
        return hasInlineEntry(node) ? <>{children}</> : <p>{children}</p>;
      },
      [BLOCKS.HEADING_1]: (_node: Inline | Block, children: ReactNode) => {
        return <h2>{children}</h2>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: Inline | Block) => {
        const entity = node?.data?.target;
        return entity && getPageBlocks(entity);
      },
      [BLOCKS.TABLE]: (_node: Inline | Block, children: ReactNode) => {
        return (
          <div className={'tableContainer'}>
            <table>
              <tbody>{children}</tbody>
            </table>
          </div>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node: Inline | Block) => {
        const entity = node?.data?.target;
        return entity && getPageBlocks(entity);
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: Inline | Block) => {
        const contentType = node?.data?.target?.fields.file.contentType;

        if (contentType?.includes('image')) {
          const imageAsset = node.data.target;
          return (
            imageAsset && (
              <ContentfulImage className={className} asset={imageAsset} hasBorderRadius withLazyLoad={false} />
            )
          );
        }

        if (contentType?.includes('video')) {
          const videoSrc = node?.data?.target?.fields.file.url;
          return (
            videoSrc && (
              <div className="rte-video">
                <VideoPlayer src={videoSrc} style={{ maxWidth: '100%' }} />
              </div>
            )
          );
        }

        return null;
      }
    }
  };

  return documentToReactComponents(richText, renderOptions);
};
