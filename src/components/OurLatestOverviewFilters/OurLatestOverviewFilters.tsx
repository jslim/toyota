import { FC, memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import css from './OurLatestOverviewFilters.module.scss';

import { variants } from '@/data/variants';

import { useLayout } from '@/hooks';
import useQueryParams, { useClearParams } from '@/hooks/use-query-params';

import BaseButton from '../BaseButton/BaseButton';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import FilterDropdownModalOptions from '../FilterDropdownModalOptions/FilterDropdownModalOptions';
import FilterList from '../FilterList/FilterList';

export type OurLatestFilterButtons = {
  title: string;
  displayTitle?: string;
  category: string;
  articleCount?: number;
  shouldClear?: boolean;
};

type FilterRowProps = {
  title: string;
  category: string;
  buttons: Array<OurLatestFilterButtons>;
  countOnAll?: boolean;
  totalCount?: number;
  showDropdown?: boolean;
  filtersLabel: string;
  allLabel: string;
};

export type OurLatestOverviewFiltersProps = {
  categoryTitle: string;
  categoryQuery: string;
  topicTitle: string;
  topicQuery: string;
  categories: Array<OurLatestFilterButtons>;
  topics: Array<OurLatestFilterButtons>;
  totalCards: number;
  filtersLabel: string;
  allLabel: string;
};

const BUTTON_LIMIT = 5;

const OurLatestFilterButton: FC<OurLatestFilterButtons> = ({
  title,
  displayTitle,
  articleCount,
  category,
  shouldClear = false
}) => {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);
  const [, setParamValue] = useQueryParams(category, { shallow: true });
  const clearParams = useClearParams([category], true);

  useEffect(() => {
    if (title === router.query[category] || (shouldClear && router.query[category] == null)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [title, router, category, shouldClear]);

  function handleOptionClick() {
    const option = title;
    if (isSelected) {
      return;
    } else if (shouldClear) {
      clearParams();
    } else {
      setParamValue(option);
    }
  }

  return (
    <BaseButton className={classnames(css.button, { [css.isActive]: isSelected })} onClick={handleOptionClick}>
      <span>{displayTitle ?? title}</span>
      <sup>{articleCount}</sup>
    </BaseButton>
  );
};

const OurLatestFilterRow: FC<FilterRowProps> = ({
  title,
  category,
  buttons,
  totalCount,
  showDropdown = false,
  filtersLabel,
  allLabel
}) => {
  const [filterItems, setFilterItems] = useState<JSX.Element>();
  const [buttonItems, setButtonsItems] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    let tempButtons = [];
    let tempFilters = [];

    // By default just show buttons
    if (!showDropdown) {
      buttons?.forEach((button) => {
        tempButtons.push(<OurLatestFilterButton key={button.title} {...button} />);
      });
    } else {
      // If we're under a set number of items show buttons...
      for (let i = 0; i < Math.min(buttons.length, BUTTON_LIMIT); i++) {
        const button = buttons[i];
        tempButtons.push(<OurLatestFilterButton key={button.title} {...button} />);
      }
      // Otherwise create filter out of remaining topics
      for (let i = BUTTON_LIMIT; i < buttons.length; i++) {
        tempFilters.push(buttons[i].title);
      }
    }

    setButtonsItems(tempButtons);

    if (tempFilters.length) {
      const categories = [{ options: tempFilters.map((el) => ({ label: el })) }];
      const dropdown = (
        <FilterDropdown
          className={css.filterDropdown}
          title={filtersLabel}
          categoryOverride={category}
          categories={categories}
          variant={variants.DARK}
          index={1}
        />
      );
      setFilterItems(dropdown);
    }
  }, [buttons, showDropdown, category, filtersLabel]);

  return (
    <div className={css.filterRow}>
      <p className={css.buttonTitle}>{title}:</p>
      <div className={css.buttonGroup}>
        <OurLatestFilterButton category={category} title={allLabel} shouldClear articleCount={totalCount} />
        {buttonItems}
        {filterItems}
      </div>
    </div>
  );
};

const OurLatestOverviewFilters: FC<OurLatestOverviewFiltersProps> = ({
  categoryTitle,
  categoryQuery,
  topicTitle,
  topicQuery,
  categories,
  topics,
  totalCards,
  filtersLabel,
  allLabel
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { layout } = useLayout();
  const desktopView = (
    <div className={css.desktopWrapper}>
      <OurLatestFilterRow
        title={categoryTitle}
        buttons={categories}
        category={categoryQuery}
        filtersLabel={filtersLabel}
        allLabel={allLabel}
      />
      <OurLatestFilterRow
        title={topicTitle}
        buttons={topics}
        countOnAll
        totalCount={totalCards}
        category={topicQuery}
        filtersLabel={filtersLabel}
        allLabel={allLabel}
        showDropdown
      />
    </div>
  );

  const mobileView = (
    <>
      <div className={classnames(css.bgOverlay, { [css.isOpen]: modalOpen })}></div>
      <BaseButton className={css.filtersButton} onClick={() => setModalOpen(true)}>
        {filtersLabel}
      </BaseButton>
      <FilterList
        className={classnames(css.filtersModal, { [css.isOpen]: modalOpen })}
        header={filtersLabel}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <FilterDropdownModalOptions
          key={1}
          category={categoryQuery}
          allLabel={allLabel}
          content={[
            {
              title: categoryTitle,
              options: [
                { label: allLabel, clearsCategory: true },
                ...categories.map((el) => ({ label: el.title, displayLabel: el.displayTitle }))
              ]
            }
          ]}
        />
        <FilterDropdownModalOptions
          key={2}
          category={topicQuery}
          allLabel={allLabel}
          content={[
            {
              title: topicTitle,
              options: [{ label: allLabel, clearsCategory: true }, ...topics.map((el) => ({ label: el.title }))]
            }
          ]}
        />
      </FilterList>
    </>
  );

  return <div className={css.root}>{!layout.mobile && !layout.tablet ? desktopView : mobileView}</div>;
};

export default memo(OurLatestOverviewFilters);
