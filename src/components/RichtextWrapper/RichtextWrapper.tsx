import { FC, memo, ReactNode, useCallback } from 'react';
import classNames from 'classnames';

import css from './RichtextWrapper.module.scss';

import formatTables from '@/utils/format-tables';

export type RichtextWrapperProps = {
  className?: string;
  children: ReactNode;
};

const RichtextWrapper: FC<RichtextWrapperProps> = ({ className, children }) => {
  const richtextWrapperRef = useCallback((node: HTMLDivElement) => {
    const childNodes = Array.from(node.childNodes);
    let hasTable;
    for (let i = 0; i < childNodes.length; ++i) {
      if (childNodes[i].nodeName === 'TABLE') {
        hasTable = true;
        break;
      }
    }
    if (hasTable) {
      formatTables();
    }
  }, []);
  return (
    <div className={classNames('RichtextWrapper', css.root, className)} ref={richtextWrapperRef}>
      {children}
    </div>
  );
};

export default memo(RichtextWrapper);
