import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './Roadmap.module.scss';

import { variants } from '@/data/variants';

import Cta, { CtaProps } from '@/components/Cta/Cta';
import Eyebrow from '@/components/Eyebrow/Eyebrow';

import RoadmapItem, { RoadmapItemSingleProps } from './RoadmapItem';

export enum RoadmapTypes {
  HOME = 'home',
  DEFAULT = 'default'
}

export type RoadmapProps = {
  className?: string;
  title?: string;
  eyebrow?: string;
  cta?: CtaProps;
  theme?: RoadmapTypes;
  items: RoadmapItemSingleProps[];
};

const Roadmap: FC<RoadmapProps> = ({ className, items, title, eyebrow, cta, theme = RoadmapTypes.DEFAULT }) => {
  const [stickyInfoHeight, setStickyInfoHeight] = useState<number>(0);

  return (
    <div className={classNames('Roadmap', css.root, className, css[theme])}>
      <div
        className={css.wrapperInfo}
        style={{
          height: stickyInfoHeight
        }}
      >
        {eyebrow && (
          <Eyebrow
            className={css.eyebrow}
            text={eyebrow}
            variant={theme === RoadmapTypes.HOME ? variants.LIGHT : variants.DARK}
          />
        )}
        {title && <h2 className={css.title}>{title}</h2>}
        {cta && <Cta className={css.cta} {...cta} isWhite={RoadmapTypes.HOME ? true : false} />}
      </div>
      <div className={css.list} style={{ marginTop: `-${stickyInfoHeight}px` }}>
        {items.map((item, i) => {
          return (
            <RoadmapItem
              item={item}
              numOfSlides={items.length}
              index={i}
              theme={theme}
              setStickyInfoHeight={setStickyInfoHeight}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Roadmap);
