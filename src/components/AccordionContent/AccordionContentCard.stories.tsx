import { Story } from '@storybook/react';

import AccordionContentCard, { AccordionContentProps } from './AccordionContentCard';

export default { title: 'components/AccordionContentCard' };

export const Default: Story<AccordionContentProps> = (args) => <AccordionContentCard {...args} />;

Default.args = {
  title: 'Security Engineer - Vehicle Software',
  text: 'Tokyo Cybersecurity & Privacy – Product Security Hybrid',
  cta: {
    title: 'Apply now',
    href: 'https://google.com'
  }
};
