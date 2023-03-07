import { FC, memo, ReactNode, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './Accordion.module.scss';

import { variants } from '@/data/variants';

import BaseButton from '@/components/BaseButton/BaseButton';
import IconCircle from '@/components/IconCircle/IconCircle';

import ArrowSvg from '@/components/svgs/svg-arrow.svg';

interface AccordionProps {
  className?: string;
  children?: ReactNode;
  variant?: string;
}

export interface AccordionItemProps {
  title?: string;
  children?: ReactNode;
  variant?: string;
  secondaryText?: string;
  tertiaryText?: string;
}

const EASE = 'power1.inOut';

export const Accordion: FC<AccordionProps> = ({ className, children, variant = variants.LIGHT }) => {
  return (
    <div className={classNames('Accordion', css.root, className, { [css.isDark]: variant === variants.DARK })}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ title, children, variant, secondaryText, tertiaryText }: AccordionItemProps) => {
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
      tl.to(content, { opacity: 0, duration: 0.25, ease: EASE })
        .to(content, {
          height: 0,
          duration: 0.5,
          ease: EASE
        })
        .set(content, { display: 'none' });
    } else {
      tl.set(content, { display: 'block' })
        .to(content, {
          height: 'auto',
          duration: 0.5,
          ease: EASE
        })
        .to(content, { opacity: 1, duration: 0.25, ease: EASE });
    }
  }, [isOpen]);

  return (
    <div className={css.accordionItem}>
      {title && (
        <BaseButton
          className={classNames(css.button, { [css.open]: isOpen })}
          onClick={toggleAccordion}
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls={`accordion-content-${title}`}
        >
          <div className={css.buttonWrapper}>
            <div className={css.titleWrapper} id={`accordion-header-${title}`}>
              <div className={css.title}> {title}</div>
              {(secondaryText || tertiaryText) && (
                <div className={css.secondaryWrapper}>
                  {secondaryText && <div className={css.text}> {secondaryText}</div>}
                  {tertiaryText && <div className={css.text}> {tertiaryText}</div>}
                </div>
              )}
            </div>

            <IconCircle className={css.icon} isWhite={variant === variants.LIGHT}>
              <ArrowSvg />
            </IconCircle>
          </div>
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

export default memo(Accordion);
