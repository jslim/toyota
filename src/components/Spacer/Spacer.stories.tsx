import { Story } from '@storybook/react';

import Spacer, { Sizes, SpacerProps } from './Spacer';

export default { title: 'components/Spacer' };

export const Small: Story<SpacerProps> = (args) => (
  <>
    <div style={{ backgroundColor: 'red', height: '200px', width: '100%' }}></div>
    <Spacer {...args} />
    <div style={{ backgroundColor: 'blue', height: '200px', width: '100%' }}></div>
  </>
);
export const Medium: Story<SpacerProps> = (args) => (
  <>
    <div style={{ backgroundColor: 'blue', height: '200px', width: '100%' }}></div>
    <Spacer {...args} />
    <div style={{ backgroundColor: 'red', height: '200px', width: '100%' }}></div>
  </>
);
export const Large: Story<SpacerProps> = (args) => (
  <>
    <div style={{ backgroundColor: 'red', height: '200px', width: '100%' }}></div>
    <Spacer {...args} />
    <div style={{ backgroundColor: 'red', height: '200px', width: '100%' }}></div>
  </>
);

Small.args = {
  size: Sizes.SMALL
};
Medium.args = {
  size: Sizes.MEDIUM
};
Large.args = {
  size: Sizes.LARGE
};
