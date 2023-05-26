import { useState } from 'react';
import { Story } from '@storybook/react';

import ContentfulImage from '../ContentfulImage/ContentfulImage';
import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import ImageCascade, { ImageCascadeProps } from './ImageCascade';

export default { title: 'components/ImageCascade' };

export const Default: Story<ImageCascadeProps> = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  return (
    <ImageCascade assetLoaded={hasLoaded}>
      <ContentfulImage
        asset={contentfulTestAsset}
        onLoad={() => {
          setHasLoaded(true);
        }}
      />
    </ImageCascade>
  );
};

export const Horizontal: Story<ImageCascadeProps> = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  return (
    <ImageCascade isHorizontal fill={'black'} assetLoaded={hasLoaded}>
      <ContentfulImage
        asset={contentfulTestAsset}
        onLoad={() => {
          setHasLoaded(true);
        }}
      />
    </ImageCascade>
  );
};
