import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import css from './PageExample.module.scss';

import { variants } from '@/data/variants';

import { Accordion, AccordionItem } from '@/components/Accordion/Accordion';
import AccordionContentCard from '@/components/AccordionContent/AccordionContentCard';
import Cta, { ButtonType } from '@/components/Cta/Cta';
import NextChapter from '@/components/NextChapter/NextChapter';

import ArrowDownSvg from '@/components/svgs/svg-arrow-down.svg';

export interface PageExampleProps {}

const Row: FC<{ title?: string; fullwidth?: boolean; children: ReactNode }> = ({ title, fullwidth, children }) => (
  <div className={classNames(css.section, { [css.fullwidth]: fullwidth })}>
    <div className={css.title}>
      <h2>{title}</h2>
    </div>
    <div className={css.wrapper}>{children}</div>
  </div>
);

const image = {
  src: 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1',
  alt: ''
};

const accordionitems = [
  {
    title: 'Security Engineer - Vehicle Software',
    text: 'Tokyo Cybersecurity & Privacy – Product Security Hybrid',
    cta: {
      title: 'Apply now',
      href: '/'
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

/**
 * Sample page that should only be used for testing. Do not ship.
 */
const PageExample: FC<PageExampleProps> = () => {
  return (
    <main className={classNames('PageExample', css.root)}>
      <section className={css.container}>
        <Row title="Typography">
          <h1 className={css.heading1}>Heading 1</h1>
          <h2 className={css.heading2}>Heading 2</h2>
          <h3 className={css.heading3}>Heading 3</h3>
          <h4 className={css.heading4}>Heading 4</h4>
          <p className={css.label}>Label</p>
          <p className={css.eyebrow}>Eyebrow</p>
          <p className={css.body}>Body</p>
        </Row>
        <Row title="Cta">
          <div>
            <Cta />
          </div>
          <div>
            <Cta theme={ButtonType.Icon}>
              <ArrowDownSvg />
            </Cta>
          </div>
          <div>
            <Cta title="Primary" />
          </div>
          <div>
            <Cta theme={ButtonType.Secondary} title="Secondary" />
          </div>
          <div style={{ background: 'black' }}>
            <Cta title="All News" isWhite={true} />
          </div>
        </Row>
        <Row title="Accordion" fullwidth={true}>
          <div>
            <Accordion>
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
            <Accordion variant={variants.DARK}>
              <AccordionItem key={1} title="Section 1">
                <p>Section 1 content...</p>
              </AccordionItem>
              <AccordionItem key={2} title="Section 2">
                <p>Section 2 content...</p>
              </AccordionItem>
              <AccordionItem key={1} title="Section 1" secondaryText="Feb 8, 2023" tertiaryText="30Mb">
                {accordionitems.map((items, key) => {
                  return <AccordionContentCard key={key} {...items} />;
                })}
              </AccordionItem>
            </Accordion>
          </div>
        </Row>
      </section>
      <Row title="Next Chapter" fullwidth>
        <NextChapter eyebrow="Eyebrow Text" link={{ title: 'Who We Are', href: 'https://google.com' }} image={image} />
      </Row>
    </main>
  );
};

export default memo(PageExample);
