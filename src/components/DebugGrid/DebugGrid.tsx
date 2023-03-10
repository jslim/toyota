import { memo } from 'react';
import classnames from 'classnames';

import css from './DebugGrid.module.scss';
import sassVars from '@/styles/export-vars.module.scss';

import { useLayout } from '@/hooks';

export type Props = {
  className?: string;
};

function DebugGrid({ className }: Props) {
  const { layout } = useLayout();
  const tablet = typeof window !== 'undefined' && layout.tablet;

  return (
    <div className={classnames(css.DebugGrid, className)}>
      <div className={css.container}>
        <div className={css.innerContainer}>
          {Array(parseInt(!tablet ? sassVars.gridNumOfCols : sassVars.gridNumOfColsTablet))
            .fill(0)
            .map((_, index) => (
              <div className={css.column} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default memo(DebugGrid);
