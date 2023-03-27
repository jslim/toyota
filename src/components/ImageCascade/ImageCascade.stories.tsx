import { Story } from '@storybook/react';

import BaseImage from '../BaseImage/BaseImage';
import ImageCascade, { ImageCascadeProps } from './ImageCascade';

export default { title: 'components/ImageCascade' };

export const Default: Story<ImageCascadeProps> = (args) => <ImageCascade {...args} />;
export const Side: Story<ImageCascadeProps> = (args) => <ImageCascade {...args} isSide />;

Default.args = {
  children: <BaseImage data={require('@/assets/images/three-logo.jpeg').default} />
};

Side.args = {
  children: <BaseImage data={require('@/assets/images/three-logo.jpeg').default} />
};
