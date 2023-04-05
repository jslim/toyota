import { FC, ForwardedRef, memo, ReactNode, useEffect, useRef, useState } from 'react';
import { DraggableCore, DraggableData, DraggableEventHandler } from 'react-draggable';
import classNames from 'classnames';
import gsap from 'gsap';
import ModifiersPlugin from 'gsap';
import { modifiers } from 'gsap/all';
import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import css from './DraggableColumns.module.scss';

import LeadershipCard, { LeadershipCardProps } from '../LeadershipCard/LeadershipCard';

export type DraggableColumnsProps = {
  className?: string;
  cards: LeadershipCardProps[];
  dragLabel: string;
};

type ColumnProps = {
  children: ReactNode;
  className?: string;
};

// Install Swiper modules
SwiperCore.use([Virtual]);

const DraggableColumns: FC<DraggableColumnsProps> = ({ cards, className }) => {
  const leftColumnArray = cards.slice(0, cards.length / 2);
  const rightColumnArray = cards.slice(cards.length / 2, cards.length);
  const [dragY, setDragY] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // const wrap = (min: number, max: number, v: number) => {
    //   const rangeSize = max - min + 1;
    //   return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    // };

    const itemHeight = columnRefs.current[0].querySelector('.card')?.getBoundingClientRect().height ?? 0;
    const columnHeight = columnRefs.current[0].getBoundingClientRect().height;
    const containerHeight = containerRef?.current?.getBoundingClientRect().height;

    // const container = containerRef.current;
    // const height = columnHeight - itemHeight;

    // console.log(height);

    // var wrap = gsap.utils.wrap(-100, 400);

    // const wrap = gsap.utils.wrap(itemHeight, columnHeight);

    // const mod = gsap.utils.wrap(0, columnHeight);

    // gsap.to(columnRefs.current[0], {
    //   duration: 0.2,
    //   ease: 'power2.out',
    //   overwrite: true,
    //   y: dragY,
    //   // modifiers: {
    //   //   y: gsap.utils.unitize(wrap) //force y value to wrap when it reaches -100
    //   // },
    //   modifiers: {
    //     y: (y, target) => {
    //       const height = target.offsetHeight;

    //       const itemsHeight = target.scrollHeight;
    //       const bounds = -(columnHeight - containerHeight);

    //       console.log(containerHeight, columnHeight, bounds);
    //       return gsap.utils.wrap(y, 0, bounds);
    //     }
    //   }
    // });

    // const marquee = marqueeRef.current;
    // const container = marquee.parentElement;

    const height = containerHeight - columnHeight;

    gsap.set(columnRefs.current[0], { y: height });
    gsap.to(columnRefs.current[0], {
      y: -height,
      repeat: -1,
      duration: 10,
      ease: 'none',
      modifiers: {
        y: gsap.utils.wrap(-height, height)
      }
    });

    gsap.to(columnRefs.current[1], { duration: 0.2, ease: 'power2.out', overwrite: true, y: dragY, delay: 0.1 });
  }, [cards.length, dragY]);

  const handleDrag: DraggableEventHandler = (e, { deltaY }: DraggableData) => {
    console.log(e, deltaY, 'hey');
    setDragY(dragY + deltaY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') {
      setDragY(dragY - 20);
    } else if (e.key === 'ArrowDown') {
      setDragY(dragY + 20);
    }
  };

  return (
    <div
      className={classNames('DraggableColumns', css.root, className)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Draggable columns"
      aria-describedby="drag-instructions"
      ref={containerRef}
    >
      <DraggableCore
        // onDrag={handleDrag}
        onDrag={handleDrag}
      >
        <div className={css.draggable}>
          <div className={classNames(css.column, css.left)} ref={(el) => (columnRefs.current[0] = el)}>
            <>
              {leftColumnArray.map((card, i) => (
                <LeadershipCard {...card} className={classNames(css.leader, 'card')} key={i} />
              ))}
            </>
          </div>
          <div className={classNames(css.column, css.right)} ref={(el) => (columnRefs.current[1] = el)}>
            <>
              {rightColumnArray.map((card, i) => (
                <LeadershipCard key={i} {...card} className={css.leader} />
              ))}
            </>
          </div>
        </div>
      </DraggableCore>

      <div id="drag-instructions" className="visually-hidden">
        Use the arrow keys to move the columns left or right
      </div>
    </div>
  );
};

export default memo(DraggableColumns);
