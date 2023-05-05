// eslint-disable-next-line simple-import-sort/imports
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Accordion, AccordionItem } from './Accordion';
import AccordionContentCard from '@/components/AccordionContent/AccordionContentCard';
import { variants } from '@/data/variants';

export default {
  title: 'components/Accordion',
  component: Accordion
} as Meta;

const Template: Story = (args) => <Accordion {...args} />;

export const SingleAccordion = Template.bind({});
SingleAccordion.args = {
  children: (
    <AccordionItem title="Section 1">
      <p>Section 1 content...</p>
    </AccordionItem>
  )
};

export const MultipleAccordionLight = Template.bind({});
MultipleAccordionLight.args = {
  children: [
    <AccordionItem key={1} title="Section 1">
      <p>Section 1 content...</p>
    </AccordionItem>,
    <AccordionItem key={2} title="Section 2">
      <p>Section 2 content...</p>
    </AccordionItem>,
    <AccordionItem key={3} title="Section 3">
      <p>Section 3 content...</p>
    </AccordionItem>
  ]
};

const items = [
  {
    title: 'Security Engineer - Vehicle Software',
    text: 'Tokyo Cybersecurity & Privacy – Product Security Hybrid',
    cta: {
      title: 'Apply now',
      href: 'https://google.com'
    }
  },
  {
    title: 'Security Engineer - Vehicle Software 2',
    text: 'Tokyo Cybersecurity & Privacy – Product Security Hybrid',
    cta: {
      title: 'Apply now',
      href: 'https://google.com'
    }
  }
];

export const MultipleAccordionDark = Template.bind({});
MultipleAccordionDark.args = {
  variant: variants.DARK,
  children: [
    <AccordionItem key={1} title="Section 1" secondaryText="Feb 8, 2023" tertiaryText="30Mb" variant={variants.DARK}>
      {items.map((items, key) => {
        return <AccordionContentCard key={key} {...items} />;
      })}
    </AccordionItem>,
    <AccordionItem key={2} title="Section 2" variant={variants.DARK}>
      <p>Section 2 content...</p>
    </AccordionItem>,
    <AccordionItem key={3} title="Section 3" variant={variants.DARK}>
      <p>Section 3 content...</p>
    </AccordionItem>
  ]
};
