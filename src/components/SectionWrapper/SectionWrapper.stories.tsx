import { Story } from '@storybook/react';

import { variants } from '@/data/variants';

import Accordion, { AccordionItem } from '@/components/Accordion/Accordion';

import SectionWrapper, { SectionWrapperProps } from './SectionWrapper';

export default { title: 'components/SectionWrapper' };

export const Default: Story<SectionWrapperProps> = (args) => <SectionWrapper {...args} />;

Default.argTypes = {
  theme: {
    options: variants,
    control: { type: 'select' }
  }
};

Default.args = {
  eyebrow: 'What we build',
  title: 'Developing the tools to build a more mobile future.'
};

export const WithContent: Story<SectionWrapperProps> = (args) => (
  <SectionWrapper {...args}>
    <div style={{ marginTop: '30px' }}>
      <Accordion variant={args.theme}>
        <AccordionItem key={1} title="Section 1">
          <p>Section 1 content...</p>
        </AccordionItem>
        <AccordionItem key={2} title="Section 2">
          <p>Section 2 content...</p>
        </AccordionItem>
        <AccordionItem key={3} title="Section 3">
          <p>Section 3 content...</p>
        </AccordionItem>
      </Accordion>
    </div>
  </SectionWrapper>
);

WithContent.args = Default.args;
WithContent.argTypes = Default.argTypes;
