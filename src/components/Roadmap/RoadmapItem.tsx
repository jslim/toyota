import { Dispatch, FC, memo, MutableRefObject, SetStateAction, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

import css from './Roadmap.module.scss';

import { ContentfulImageAsset } from '@/data/types';

import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';

import resize from '@/services/resize';
import useLayout from '@/hooks/use-layout';
import { Color } from '@/utils/colors';

import ContentfulImage from '../ContentfulImage/ContentfulImage';
import { RoadmapTypes } from './Roadmap';

export type RoadmapItemSingleProps = {
  title: string;
  text: string;
  image?: ContentfulImageAsset;
  svg?: ContentfulImageAsset;
};

export type RoadmapItemProps = {
  item: RoadmapItemSingleProps;
  index: number;
  numOfSlides: number;
  theme?: RoadmapTypes;
  setStickyInfoHeight?: Dispatch<SetStateAction<number>>;
};

const RoadmapItem: FC<RoadmapItemProps> = ({ item, index, theme, numOfSlides, setStickyInfoHeight }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { layout } = useLayout();
  const tl = useRef() as MutableRefObject<GSAPTimeline>;

  useEffect(() => {
    const handleResize = () => {
      index === 0 && setStickyInfoHeight && itemRef.current && setStickyInfoHeight(itemRef.current?.offsetHeight);
    };
    handleResize();

    resize.listen(handleResize);

    return () => {
      resize.dismiss(handleResize);
      tl.current?.kill();
    };
  }, [itemRef, setStickyInfoHeight, index]);

  useEffect(() => {
    const scale = 2;
    const opacityTrigger = theme === RoadmapTypes.HOME ? 47 : 29;

    const q = gsap.utils.selector(itemRef.current);
    const wrapper = q('.wrapper');
    const content = q('.content');
    const scaleDown = q('.scaleDown');

    // we create a timeline for each mobile and desktop
    // before the layout changes if timeline exists we clear props and kill old timeline
    gsap.set([wrapper, content, scaleDown], { clearProps: true });
    tl.current?.progress(0).kill();

    if (layout.mobile) {
      // fadeOut content on all but last slides
      if (numOfSlides - 1 !== index) {
        gsap.set(content, {
          opacity: 1
        });
        content.forEach((item) =>
          gsap.to(item, {
            opacity: 0,
            duration: 0.6,
            ease: 'Power3.out',

            scrollTrigger: {
              start: `top ${opacityTrigger}%`,
              trigger: item,
              toggleActions: 'play none none reverse'
            }
          })
        );
      }

      if (index === 0) return;

      gsap.set(wrapper, {
        scale: 0.5
      });
      gsap.set(scaleDown, {
        scale: scale
      });
      //   animate bg scale on all but first slides
      //   use `expoScale` for a smooth bg scale in while content scale out
      //   to create a clip mask on content
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            start: 'top 90%',
            end: 'top 25%',
            trigger: itemRef.current,
            scrub: true
          }
        })
        .to(wrapper, {
          scale: 1,
          duration: 0.6,
          ease: 'expoScale(0.5, 1)'
        })
        .to(
          scaleDown,
          {
            scale: 1,
            duration: 0.6,
            ease: `expoScale(${scale}, 1)`
          },
          '-=0.6'
        );
    } else {
      // skip animating first slide
      if (index === 0) {
        return;
      }
      gsap.set(wrapper, {
        scale: 0.5
      });
      gsap.set(scaleDown, { scale });
      gsap.set(content, {
        opacity: theme === RoadmapTypes.HOME ? 1 : 0
      });

      tl.current = gsap
        .timeline({
          scrollTrigger: {
            start: 'top 75%',
            end: 'top 25%',
            trigger: itemRef.current,
            scrub: true
          }
        })
        .to(wrapper, {
          scale: 1,
          duration: 1.5,
          ease: 'expoScale(0.5, 1)'
        })
        .to(
          scaleDown,
          {
            scale: 1,
            duration: 1.5,
            ease: `expoScale(${scale}, 1)`
          },
          '-=1.5'
        )
        .to(
          content,
          {
            opacity: 1,
            duration: 1,
            ease: 'linear'
          },
          '-=1'
        );
    }
  }, [layout, index, theme, numOfSlides]);

  return (
    <div ref={itemRef} className={css.item}>
      <SectionWrapper className={css.sectionWrapper} backgroundColor={Color.LIGHT_GREY}>
        {theme === RoadmapTypes.HOME && item.image && (
          <ContentfulImage
            className={classNames(css.image, 'scaleDown')}
            asset={item.image}
            imageSizeMobile={{ extraGutters: 0, numCols: 4 }}
            imageSizeTablet={{ extraGutters: 0, numCols: 8 }}
            imageSizeDesktop={{ extraGutters: 0, numCols: 12 }}
          />
        )}
        <div className={classNames(css.wrapper, 'scaleDown')}>
          {theme === RoadmapTypes.DEFAULT && item.svg && (
            <div className={classNames(css.svg, 'content')}>
              <ContentfulImage
                className={css.svgIcon}
                asset={item.svg}
                imageSizeMobile={{ extraGutters: 0, numCols: 3 }}
                imageSizeTablet={{ extraGutters: 0, numCols: 3 }}
                imageSizeDesktop={{ extraGutters: 0, numCols: 4 }}
              />
            </div>
          )}
          <div className={classNames(css.content, 'content')}>
            <div className={css.itemTitle}>{item.title}</div>
            <div className={css.itemText}>{item.text}</div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default memo(RoadmapItem);
