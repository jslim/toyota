import { FC, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import css from './FeaturesList.module.scss';

import { variants } from '@/data/variants';

import Eyebrow from '@/components/Eyebrow/Eyebrow';

import resize from '@/services/resize';

gsap.registerPlugin(ScrollTrigger);

export type FeaturesListProps = {
  className?: string;
  title?: string;
  eyebrow?: string;
  items: { title: string; text: string }[];
};

const FeaturesList: FC<FeaturesListProps> = ({ className, title, eyebrow, items }) => {
  const itemRef = useRef<(HTMLDivElement | null)[]>([]);
  const itemPointRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activePoints, setActivePoints] = useState<boolean[]>(items.map(() => false));

  useEffect(() => {
    const resizeTimeline = () => {
      const bottomOffset =
        Number(itemRef.current[itemRef.current.length - 1]?.offsetHeight) -
        Number(itemPointRef.current[itemRef.current.length - 1]?.offsetTop);
      gsap.set(timelineRef.current, {
        top: itemPointRef.current[1]?.offsetTop,
        bottom: bottomOffset
      });
    };
    resizeTimeline();

    resize.listen(resizeTimeline);

    return () => {
      resize.dismiss(resizeTimeline);
    };
  }, [itemRef, itemPointRef, timelineRef]);

  useEffect(() => {
    const handleActivePoints = (i: number, active: boolean) => {
      setActivePoints((datas) => ({
        ...datas,
        [i]: active
      }));
    };

    const scrollTriggers: gsap.core.Tween[] = [];
    itemPointRef.current.forEach((point, i) => {
      const scrollTrigger = gsap.to(point, {
        scrollTrigger: {
          start: 'top 50%',
          end: 'bottom 50%',
          trigger: point,
          endTrigger: timelineRef.current,
          scrub: true,
          onEnter: () => handleActivePoints(i, true),
          onLeaveBack: () => handleActivePoints(i, false)
        }
      });

      scrollTriggers.push(scrollTrigger);
    });

    const progressBarScrollTrigger = gsap.to(progressBarRef.current, {
      scaleY: 1,
      ease: 'linear',
      scrollTrigger: {
        start: 'top 50%',
        end: 'bottom 50%',
        trigger: timelineRef.current,
        endTrigger: timelineRef.current,
        scrub: true
      }
    });

    scrollTriggers.push(progressBarScrollTrigger);

    // Cleanup function
    return () => {
      scrollTriggers?.forEach((scrollTrigger) => {
        scrollTrigger?.scrollTrigger?.kill();
      });
    };
  }, [progressBarRef, timelineRef, itemPointRef]);

  return (
    <div className={classNames('FeaturesList', css.root, className)}>
      <div className={css.wrapper}>
        {eyebrow && <Eyebrow className={css.eyebrow} text={eyebrow} variant={variants.LIGHT} />}
        {title && <h2 className={css.title}>{title}</h2>}
        <div className={css.list}>
          <div className={css.timeline} ref={timelineRef}>
            <div className={css.prograssBar} ref={progressBarRef} />
          </div>
          {items.map((item, i) => {
            return (
              <div className={classNames(css.item)} key={`item-${i}`} ref={(ref) => (itemRef.current[i] = ref)}>
                <div
                  className={classNames(css.circle, { [css.active]: activePoints[i] })}
                  ref={(ref) => (itemPointRef.current[i] = ref)}
                />
                <div className={css.itemTitle}>{item.title}</div>
                <div className={css.itemText}>{item.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(FeaturesList);
