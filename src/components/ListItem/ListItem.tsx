import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './ListItem.module.scss';

import { variants } from '@/data/variants';

import BaseButton from '@/components/BaseButton/BaseButton';
import BaseLink, { Props as LinkProps } from '@/components/BaseLink/BaseLink';
import IconCircle from '@/components/IconCircle/IconCircle';

import ArrowDown from '@/components/svgs/svg-arrow-down.svg';
import ChevronDown from '@/components/svgs/svg-chevron-down.svg';
import { ContentfulMediaAsset } from '@/data/types';

export type ListItemProps = {
  className?: string;
  title: string;
  variant?: variants | string;
  secondaryText?: string;
  tertiaryText?: string;
  onClick?: () => void;
  isMediaKit?: boolean;
  isAccordionOpen?: boolean;
  asset?: ContentfulMediaAsset;
  link?: LinkProps;
};

const innerItem = (title: string, secondaryText?: string, tertiaryText?: string) => {
  return (
    <>
      <div className={css.title}> {title}</div>
      {(secondaryText || tertiaryText) && (
        <div className={css.secondaryWrapper}>
          {secondaryText && <div className={css.text}> {secondaryText}</div>}
          {tertiaryText && <div className={css.text}> {tertiaryText}</div>}
        </div>
      )}
    </>
  );
};

const ListItem: FC<ListItemProps> = ({
  className,
  title,
  variant,
  secondaryText,
  tertiaryText,
  onClick,
  isMediaKit,
  isAccordionOpen,
  asset,
  link
}) => {
  return (
    <div className={classNames('ListItem', css.root, className)}>
      {!isMediaKit ? (
        <BaseButton
          className={classNames(css.button, { [css.open]: isAccordionOpen, [css.isDark]: variant === variants.DARK })}
          aria-expanded={isAccordionOpen ? 'true' : 'false'}
          aria-controls={`accordion-content-${title}`}
          onClick={onClick}
        >
          <div className={css.buttonWrapper}>
            <div className={css.titleWrapper} id={`accordion-header-${title}`}>
              {innerItem(title, secondaryText, tertiaryText)}
            </div>

            <IconCircle className={css.icon} isWhite={variant === variants.DARK}>
              <ChevronDown />
            </IconCircle>
          </div>
        </BaseButton>
      ) : Boolean(asset) ? (
        <BaseButton
          className={classNames(css.button, css.mediaKit, { [css.isDark]: variant === variants.DARK })}
          onClick={onClick}
        >
          <div className={css.buttonWrapper}>
            <div className={css.titleWrapper}>{innerItem(title, secondaryText, tertiaryText)}</div>
            <IconCircle className={css.icon} isWhite>
              <ArrowDown />
            </IconCircle>
          </div>
        </BaseButton>
      ) : (
        <BaseLink
          className={classNames(css.button, css.mediaKit, {
            [css.isDark]: variant === variants.DARK,
            [css.isLink]: link
          })}
          {...link}
        >
          <div className={css.buttonWrapper}>
            <div className={css.titleWrapper}>{innerItem(title, secondaryText, tertiaryText)}</div>
            <IconCircle className={css.icon} isWhite>
              <ArrowDown />
            </IconCircle>
          </div>
        </BaseLink>
      )}
    </div>
  );
};

export default memo(ListItem);
