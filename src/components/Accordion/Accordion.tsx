import { FC, memo, useRef, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './Accordion.module.scss';
import BaseButton from '@/components/BaseButton/BaseButton';
import IconCircle from '@/components/IconCircle/IconCircle';

import ArrowSvg from '@/components/svgs/svg-arrow.svg';

interface AccordionProps {
  className?: string;
  children: React.ReactNode;
}

export default interface AccordionItemProps {
  title?: string;
  children: React.ReactNode;
}

export const Accordion: FC<AccordionProps> = ({ className, children }) => {
  return <div className={classNames('Accordion', css.root, className)}>{children}</div>;
};

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);

    animateAccordion();
  };

  const animateAccordion = useCallback(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const tl = gsap.timeline();

    if (isOpen) {
      tl.to(content, { opacity: 0, duration: 0.25, ease: 'power1.inOut' })
        .to(content, {
          height: 0,
          duration: 0.5,
          ease: 'power1.inOut'
        })
        .set(content, { display: 'none' });
    } else {
      tl.set(content, { display: 'block' })
        .to(content, {
          height: 'auto',
          duration: 0.5,
          ease: 'power1.inOut'
        })
        .to(content, { opacity: 1, duration: 0.25, ease: 'power1.inOut' });
    }
  }, [isOpen]);

  console.log(isOpen);

  return (
    <div className={css.accordionItem}>
      {title && (
        <BaseButton
          className={classNames(css.button, { [css.open]: isOpen })}
          onClick={toggleAccordion}
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls={`accordion-content-${title}`}
        >
          <div className={css.title}> {title}</div>

          <IconCircle className={css.icon}>
            <ArrowSvg />
          </IconCircle>
        </BaseButton>
      )}
      <div className={css.contentWrapper} ref={contentRef}>
        <div
          className={css.content}
          id={`accordion-content-${title}`}
          role="region"
          aria-labelledby={`accordion-header-${title}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Accordion.Item = AccordionItem;

export default memo(Accordion);
