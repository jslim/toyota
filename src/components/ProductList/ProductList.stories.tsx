import { Story } from '@storybook/react';

import ProductList, { ProductListProps } from './ProductList';

export default { title: 'components/ProductList' };

export const Default: Story<ProductListProps> = (args) => <ProductList {...args} />;

const image = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';

Default.args = {
  eyebrow: 'What we build',
  title: 'Developing the tools to build a more mobile future.',
  items: [
    {
      title: 'Software-Defined Vehicles',
      text: 'Supporting the creation, deployment, and continuous improvement of software-defined vehicles is Arene: the intelligent operating system that brings our world-class.',
      cta: { href: '/' },
      image: { src: image, alt: '' }
    },
    {
      title: 'AD/ADAS Technologies',
      text: 'Our Automated Driving/Advanced Driver Assistance System suite provides people the ability to achieve truly safe, secure, and unrestricted mobility.',
      cta: { href: '#' },
      image: { src: image, alt: '' }
    },
    {
      title: 'Geo',
      text: 'Supporting the creation, deployment, and continuous improvement of software-defined vehicles is Arene: the intelligent operating system that brings our world-class.',
      cta: { href: '#' },
      image: { src: image, alt: '' }
    },
    {
      title: 'Woven City',
      text: 'Our Automated Driving/Advanced Driver Assistance System suite provides people the ability to achieve truly safe, secure, and unrestricted mobility.',
      cta: { href: '/' },
      image: { src: image, alt: '' }
    }
  ]
};

Default.argTypes = {};
