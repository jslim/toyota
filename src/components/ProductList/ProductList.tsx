import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './ProductList.module.scss';

import ProductListRow, { ProductListRowProps } from './ProductListRow';

import { variants } from '@/data/variants';

import SectionWrapper from '@/components/SectionWrapper/SectionWrapper';

export type ProductListProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  items: ProductListRowProps[];
};

const ProductList: FC<ProductListProps> = ({ className, eyebrow, title, items }) => {
  return (
    <div className={classNames('ProductList', css.root, className)}>
      <SectionWrapper eyebrow={eyebrow} title={title} theme={variants.DARK}>
        <div className={css.list}>
          {items.map((item, i) => {
            return <ProductListRow {...item} key={`item-${i}`} />;
          })}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default memo(ProductList);
