import {
  Children,
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import classnames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import noop from 'no-op';

import styles from './Tabs.module.scss';

gsap.registerPlugin(ScrollTrigger);

enum Keys {
  END = 'End',
  HOME = 'Home',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown'
}

type CarouselContentType = {
  content: (HTMLCollection | Element)[];
  img: Element | null;
};

export type Props = {
  className?: string | null;
  tabListLabel?: string;
  children?: ReactNode;
};

export const Tabs = ({ className, tabListLabel = '', children }: Props) => {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const childrenArray = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [animatingIn, setAnimatingIn] = useState(-1);
  const [animatingOut, setAnimatingOut] = useState(-1);

  function previousTab() {
    active - 1 < 0 ? handleTabChange(childrenArray.length - 1) : handleTabChange(active - 1);
  }

  function nextTab() {
    handleTabChange((active + 1) % childrenArray.length);
  }

  const handleTabChange = (index: number) => {
    const prevSlide = document.getElementById(`panel-${active}`);
    const activeSlide = document.getElementById(`panel-${index}`);
    let dataPrev: CarouselContentType = { content: [], img: null };
    let dataActive: CarouselContentType = { content: [], img: null };

    // get copy elements and img separetely for animation
    const getContentElements = (data: CarouselContentType, slide: HTMLElement | null) => {
      if (slide?.children?.length) {
        for (let i = 0; i < slide?.children?.length; i++) {
          for (let z = 0; z < slide?.children[i].children.length; z++) {
            slide?.children[i].children[z].tagName.toLowerCase() !== 'img'
              ? data.content.push(slide?.children[i].children[z])
              : (data.img = slide?.children[i].children[z]);
          }
        }
      }
    };
    getContentElements(dataPrev, prevSlide);
    getContentElements(dataActive, activeSlide);

    // set new active slide elements to fade out
    gsap.set(dataActive.content, { opacity: 0, y: 50 });
    gsap.set(dataActive.img, { clipPath: 'inset(100% 0% 100% 0%)' });

    function animateOut(index: number, data: CarouselContentType, callback: Function) {
      setAnimatingOut(active);
      setAnimatingIn(index);
      gsap.to(data.content, {
        opacity: 0,
        duration: 0.5,
        ease: 'ease01',
        onComplete: () => callback()
      });
    }

    function animateIn(data: CarouselContentType, delay = 0) {
      gsap.to(data.img, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        delay: delay,
        ease: 'ease01'
      });

      gsap.to(data.content, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: delay + 0.2,
        ease: 'ease01',
        onComplete: () => {
          setAnimatingIn(-1);
          setAnimatingOut(-1);
        }
      });
    }

    animateOut(index, dataPrev, () => {
      setActive(index);
    });
    animateIn(dataActive, 0.5);
  };

  useEffect(() => {
    gsap.set(containerRef.current, { autoAlpha: 0 });
    gsap.to(containerRef.current, {
      scrollTrigger: {
        start: 'top 40%',
        trigger: containerRef.current,
        once: true,
        onEnter: () => {
          handleTabChange(0);
          gsap.set(containerRef.current, { autoAlpha: 1 });
          gsap.effects.fadeIn(listRef.current, { duration: 1, y: 50 });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyup(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === Keys.UP) previousTab();
    else if (e.key === Keys.DOWN) nextTab();
    else if (e.key === Keys.END) handleTabChange(childrenArray.length - 1);
    else if (e.key === Keys.HOME) handleTabChange(0);
  }

  return (
    <div className={classnames(styles.Tabs, className)} ref={containerRef}>
      <ul className={styles.tabsList} role="tablist" aria-label={tabListLabel} ref={listRef}>
        {childrenArray.map((child, index) => {
          const label = (child as ReactElement).props['data-label'];
          if (!label) {
            console.warn('Child component has no data-label prop');
            return null;
          } else {
            return (
              <Tab
                index={index}
                key={`${label}${index}`}
                label={label}
                isActive={active === index}
                onClick={() => handleTabChange(index)}
                onKeyUp={handleKeyup}
              >
                {label}
              </Tab>
            );
          }
        })}
      </ul>

      <div className={styles.tabsContent}>
        {childrenArray.map((child, index) => (
          <div
            className={classnames(styles.tabWrapper, {
              [styles.active]: index === active,
              [styles.animatingIn]: index === animatingIn,
              [styles.animatingOut]: index === animatingOut
            })}
            id={`panel-${index}`}
            key={`panel-${index}`}
            role="tabpanel"
            aria-live="polite"
            aria-labelledby={`tab-${index}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

type TabProps = {
  isActive: boolean;
  label: string;
  index: number;
  onClick: Function;
  onKeyUp: Function;
  children: ReactNode;
};

export default memo(Tabs);

export const Tab = ({ isActive, label, index, onClick = noop, onKeyUp = noop }: TabProps) => {
  const el = useRef<HTMLLIElement | null>(null);

  return (
    <li
      id={`tab-${index}`}
      ref={el}
      className={classnames(styles.tab, { [styles.active]: isActive })}
      role="tab"
      aria-controls={`panel-${index}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick as MouseEventHandler<HTMLLIElement>}
      onKeyUp={onKeyUp as KeyboardEventHandler<HTMLLIElement>}
    >
      {label}
    </li>
  );
};
