import { FC, memo, ReactNode, useCallback, useState } from 'react';
import classNames from 'classnames';

import css from './RichtextWrapper.module.scss';

import formatTables from '@/utils/format-tables';

export type RichtextWrapperProps = {
  className?: string;
  children: ReactNode;
};

const RichtextWrapper: FC<RichtextWrapperProps> = ({ className, children }) => {
  const [hasFormatted, setHasFormatted] = useState(false);
  const richtextWrapperRef = useCallback(
    (node: HTMLDivElement) => {
      if (children != null && node != null && !hasFormatted) {
        formatTables(node);
        setHasFormatted(true);
      }
    },
    [children, hasFormatted]
  );

  return (
    <span className={classNames('RichtextWrapper', css.root, className)} ref={richtextWrapperRef}>
      {children}
    </span>
  );
};

export default memo(RichtextWrapper);
