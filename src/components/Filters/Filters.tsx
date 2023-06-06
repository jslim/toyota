import { FC, memo, useMemo } from 'react';
import classNames from 'classnames';

import css from './Filters.module.scss';

import BaseButton from '@/components/BaseButton/BaseButton';
import FilterDropdown from '@/components/FilterDropdown/FilterDropdown';
import Searchbar from '@/components/Searchbar/Searchbar';

import { useLayout } from '@/hooks';

export type FiltersProps = {
  className?: string;
  filtersLabel: string;
  searchLabel: string;
  cleanLabel: string;
  onFilterModalClick: () => void;
  dropdowns: object;
  filtersAmount: number;
  onSearch: (searchText: string) => void;
};

const Filters: FC<FiltersProps> = ({
  className,
  filtersLabel,
  searchLabel,
  cleanLabel,
  onFilterModalClick,
  onSearch,
  dropdowns,
  filtersAmount
}) => {
  const { layout } = useLayout();
  const isDesktop = useMemo(() => {
    return typeof window !== 'undefined' && !layout.tablet && !layout.mobile;
  }, [layout.mobile, layout.tablet]);

  const FilterCopy = (
    <div className={css.filtersCopy}>
      {filtersLabel}
      {filtersAmount > 0 && <span className={css.amount}>{filtersAmount}</span>}
    </div>
  );

  return (
    <div className={classNames('Filters', css.root, className)}>
      <Searchbar className={css.search} label={searchLabel} onSearch={onSearch} cleanLabel={cleanLabel} />

      <div className={css.container}>
        {!isDesktop ? (
          <BaseButton className={css.filtersButton} onClick={onFilterModalClick}>
            {FilterCopy}
          </BaseButton>
        ) : (
          FilterCopy
        )}
        {isDesktop &&
          Object.values(dropdowns).map((category, index) => {
            return (
              <FilterDropdown
                className={css.dropdown}
                key={index}
                title={category.header}
                categories={category.content}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default memo(Filters);
