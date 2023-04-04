import { Dispatch, FC, FunctionComponent, memo, MutableRefObject, SetStateAction, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ExpoScaleEase } from 'gsap/EasePack';
import css from './Roadmap.module.scss';

import resize from '@/services/resize';
import BaseImage, { BaseImageProps } from '@/components/BaseImage/BaseImage';
import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';

import useLayout from '@/hooks/use-layout';
import { variants } from '@/data/variants';
import { RoadmapTypes } from './Roadmap';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ExpoScaleEase);

export type RoadmapItemSingleProps = { title: string; text: string; image?: BaseImageProps; svg?: FunctionComponent };

export type RoadmapItemProps = {
  item: RoadmapItemSingleProps;
  index: number;
  max: number;
  theme?: RoadmapTypes;
  setStickyInfoHeight?: Dispatch<SetStateAction<number>>;
};

const RoadmapItem: FC<RoadmapItemProps> = ({ item, index, theme, max, setStickyInfoHeight }) => {
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
      tl.current.kill();
    };
  }, [itemRef, setStickyInfoHeight, index]);

  useEffect(() => {
    const scale = 2;
    const opacityTrigger = theme === RoadmapTypes.HOME ? 47 : 32;

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
      if (max - 1 !== index) {
        gsap.set(content, {
          opacity: 1
        });
        content.map((item) =>
          gsap.to(item, {
            opacity: 0,
            duration: 0.6,
            ease: 'Power3.out',

            scrollTrigger: {
              start: `top ${opacityTrigger}%`,
              markers: true,
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
      gsap.set(scaleDown, {
        scale: scale
      });
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
  }, [layout, index, theme, max]);

  return (
    <div ref={itemRef} className={css.item}>
      <SectionWrapper className={css.sectionWrapper} theme={variants.LIGHT}>
        {theme === RoadmapTypes.HOME && <BaseImage className={classNames(css.image, 'scaleDown')} {...item.image} />}
        <div className={classNames(css.wrapper, 'scaleDown')}>
          {theme === RoadmapTypes.DEFAULT && item.svg && (
            <div className={classNames(css.svg, 'content')}>{<item.svg />}</div>
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
