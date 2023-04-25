import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import { useAppSelector } from '@/redux';

export interface PageDefaultProps {
  className?: string;
  children: ReactNode;
}

const PageExample: FC<PageDefaultProps> = ({ className = 'Default', children }) => {
  const { homepageBannerHeight } = useAppSelector((state) => state);
  return (
    <main className={classNames('Main', className)} style={{ marginTop: homepageBannerHeight }}>
      {children}
    </main>
  );
};

export default memo(PageExample);
