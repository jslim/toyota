import { FC, memo, useMemo, useState } from 'react';
import classNames from 'classnames';

import BaseButton, { BaseProps as BaseButtonProps } from '../BaseButton/BaseButton';
import BaseLink, { Props as BaseLinkProps } from '../BaseLink/BaseLink';

import css from './Cta.module.scss';

import IconCircle from '@/components/IconCircle/IconCircle';

import ArrowSvg from '@/components/svgs/svg-arrow.svg';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Large = 'large',
  Icon = 'icon'
}
export type CtaProps = (BaseButtonProps | BaseLinkProps) & {
  isWhite?: boolean;
  isActive?: boolean;
  isInteractable?: boolean;
  setActiveOutside?: boolean;
  theme?: ButtonType;
};

const isLink = (props: CtaProps): props is BaseLinkProps => {
  // check if the specified property has href
  return 'href' in props && !!props.href;
};

const Cta: FC<CtaProps> = ({
  isWhite,
  isActive,
  className,
  isInteractable = true,
  setActiveOutside = false,
  theme = ButtonType.Primary,
  ...props
}: CtaProps) => {
  const [hover, setHover] = useState(false);
  const classes = useMemo(
    () =>
      classNames(className, css.root, {
        [css.isWhite]: isWhite
      }),
    [isWhite, className]
  );

  const buttonProps = useMemo(
    () => ({
      className: classes,
      onMouseEnter: () => !setActiveOutside && setHover(true),
      onMouseLeave: () => !setActiveOutside && setHover(false)
    }),
    [setActiveOutside, classes]
  );

  const internalContent = useMemo(
    () => (
      <>
        <IconCircle isWhite={isWhite} isActive={setActiveOutside ? isActive : hover} theme={theme}>
          {theme === ButtonType.Primary ? <ArrowSvg /> : props.children}
        </IconCircle>
        {props.title && <div className={css.label}>{props.title}</div>}
      </>
    ),
    [hover, isActive, isWhite, props.children, props.title, setActiveOutside, theme]
  );

  // Early return if component should only be visual - used if parent includes a link.
  if (!isInteractable) return <span {...buttonProps}>{internalContent}</span>;

  return (
    <>
      {isLink(props) ? (
        <BaseLink {...props} {...buttonProps}>
          {internalContent}
        </BaseLink>
      ) : (
        <BaseButton {...props} {...buttonProps}>
          {internalContent}
        </BaseButton>
      )}
    </>
  );
};

export default memo(Cta);
