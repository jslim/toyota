import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './CareersList.module.scss';

export type CareersListProps = {
  className?: string;
};

const CareersList: FC<CareersListProps> = ({ className }) => {
  return (
    <div className={classNames('CareersList', css.root, className)}>
      <p>CareersList component</p>
    </div>
  );
};

export default memo(CareersList);
