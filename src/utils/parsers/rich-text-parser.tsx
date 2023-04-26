import { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import noop from 'no-op';

import { FilteredEntity } from '@/data/types';
import { ContentfulImageAsset } from '@/data/types';

import BaseLink, { Target } from '@/components/BaseLink/BaseLink';
import ContentfulImage from '@/components/ContentfulImage/ContentfulImage';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

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
      [BLOCKS.PARAGRAPH]: (_node: ContentfulNodeType, children: ReactNode) => {
        return <p style={{ margin: '1.12em 0' }}>{children}</p>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: ContentfulEmbeddedNodeType) => {
        const entity = node?.data?.target;
        return entity && getPageBlocks(entity);
      },
      [INLINES.EMBEDDED_ENTRY]: (node: ContentfulEmbeddedNodeType) => {
        const entity = node?.data?.target;
        return entity && getPageBlocks(entity);
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: ContentfulImageNodeType) => {
        const contentType = node?.data?.target?.fields.file.contentType;

        if (contentType?.includes('image')) {
          const imageAsset = node.data.target;
          return imageAsset && <ContentfulImage className={className} asset={imageAsset} />;
        }

        if (contentType?.includes('video')) {
          const videoSrc = node?.data?.target?.fields.file.url;
          return (
            videoSrc && (
              <VideoPlayer
                src={videoSrc}
                style={{ width: '720px', height: '306px', margin: 'auto' }}
                poster={''}
                windowWidth={window.innerWidth}
                windowHeight={window.innerHeight}
                togglePlayOnClick={true}
                startTime={0}
                allowKeyboardControl={true}
                showControlsOnLoad={true}
                hasControls={true}
                hasPlayOnly={false}
                autoPlayDelay={0}
                disableBackgroundCover={true}
                controlsTimeout={2.5}
                togglePlaying={noop}
                onEnd={noop}
              />
            )
          );
        }

        return null;
      }
    }
  };

  return documentToReactComponents(richText, renderOptions);
};
