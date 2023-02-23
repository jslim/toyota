import { memo } from 'react';
import classnames from 'classnames';

import css from './DebugGrid.module.scss';
import sassVars from '@/styles/export-vars.module.scss';

export type Props = {
  className?: string;
};

function DebugGrid({ className }: Props) {
  return (
    <div className={classnames(css.DebugGrid, className)}>
      <div className={css.container}>
        {Array(parseInt(sassVars.gridNumOfCols))
          .fill(0)
          .map((_, index) => (
            <div className={css.column} key={index} />
          ))}
      </div>
    </div>
  );
}

export default memo(DebugGrid);
