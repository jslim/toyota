// eslint-disable-next-line simple-import-sort/imports
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Accordion, AccordionItem } from './Accordion';
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

export const MultipleAccordionDark = Template.bind({});
MultipleAccordionDark.args = {
  variant: variants.DARK,
  children: [
    <AccordionItem key={1} title="Section 1" secondaryText="Feb 8, 2023" tertiaryText="30Mb">
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
