import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Accordion } from './Accordion';

export default {
  title: 'components/Accordion',
  component: Accordion
} as Meta;

const Template: Story = (args) => <Accordion {...args} />;

export const SingleAccordion = Template.bind({});
SingleAccordion.args = {
  children: (
    <Accordion.Item title="Section 1">
      <p>Section 1 content...</p>
    </Accordion.Item>
  )
};

export const MultipleAccordion = Template.bind({});
MultipleAccordion.args = {
  children: [
    <Accordion.Item key={1} title="Section 1">
      <p>Section 1 content...</p>
    </Accordion.Item>,
    <Accordion.Item key={2} title="Section 2">
      <p>Section 2 content...</p>
    </Accordion.Item>,
    <Accordion.Item key={3} title="Section 3">
      <p>Section 3 content...</p>
    </Accordion.Item>
  ]
};
