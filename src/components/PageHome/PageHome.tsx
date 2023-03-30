import { FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './PageHome.module.scss';

import { PageProps } from '@/data/types';

import TextIntro from '../TextIntro/TextIntro';
import { TextIntroLayout } from '../TextIntro/TextIntro';

export interface PageHomeProps extends PageProps {
  className?: string;
}

const data = {
  layout: TextIntroLayout.Default,
  data: {
    eyebrow: 'test',
    header: 'test',
    description: 'test',
    ctaText: 'test',
    subsection: {
      header1: 'test',
      description1: 'test',
      header2: 'test',
      description2: 'test'
    }
  }
};

const PageHome: FC<PageHomeProps> = ({ className }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const timeline = gsap
      .timeline()
      .fadeIn(titleRef.current, 0.2)
      .fadeIn(descriptionRef.current, 0.4)
      .fadeIn(listRef.current?.childNodes, { stagger: 0.1 }, 0.6);

    return () => {
      timeline?.kill();
    };
  }, []);

  return (
    <main className={classNames('PageHome', css.root, className)}>
      <section className={css.hero}>
        <h1 className={css.title} ref={titleRef}>
          Welcome to Jam3!
        </h1>
        <h2 className={css.description} ref={descriptionRef}>
          To get started, edit <code>pages/index.js</code> and save to reload.
        </h2>
        <ul className={css.row} ref={listRef}>
          <li>
            <a
              href="https://github.com/Jam3?q=&type=source"
              className={css.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Visit out GitHub</h3>
              <p>See our contributions to Open Source community</p>
            </a>
          </li>
          <li>
            <a href="https://jam3.dev" className={css.card} target="_blank" rel="noopener noreferrer">
              <h3>Jam3.dev</h3>
              <p>Learn more about Jam3.dev</p>
            </a>
          </li>
        </ul>
      </section>
      <TextIntro layout={data.layout} data={data.data} />
    </main>
  );
};

export default memo(PageHome);
