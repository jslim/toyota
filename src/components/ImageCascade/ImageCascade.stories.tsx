import { Story } from '@storybook/react';

import BaseImage from '../BaseImage/BaseImage';
import ImageCascade, { ImageCascadeProps } from './ImageCascade';

export default { title: 'components/ImageCascade' };

export const Default: Story<ImageCascadeProps> = () => (
  <ImageCascade>
    <BaseImage width={900} height={500} data={require('@/assets/images/three-logo.jpeg').default} />
  </ImageCascade>
);

export const Horizontal: Story<ImageCascadeProps> = () => (
  <ImageCascade isHorizontal fill={'black'}>
    <BaseImage width={800} height={500} data={require('@/assets/images/home-slide-2.jpg').default} />
  </ImageCascade>
);
