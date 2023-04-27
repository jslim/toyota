import { FC, memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './FilterDropdownModalOptions.module.scss';

import IconCircle from '@/components/IconCircle/IconCircle';

import useQueryParams, { useClearParams } from '@/hooks/use-query-params';

import CheckmarkSvg from '@/components/svgs/white-checkmark.svg';

interface Option {
  label: string;
}

interface Content {
  title?: string;
  options: Option[];
}

export type FilterDropdownModalOptionsProps = {
  className?: string;
  header?: string;
  content: Content[];
  category: string;
  onSelectOption?: (option: string) => void;
};

const FilterDropdownModalOptions: FC<FilterDropdownModalOptionsProps> = ({ className, header, content, category }) => {
  const [selectedOption, setSelectedOption] = useState<Option>(content[0].options[0]);

  const filtersState = {};
  const useQueryParamsArray = useQueryParams(category, { shallow: true });
  // @ts-ignore
  filtersState[category] = {
    param: useQueryParamsArray[0],
    setParam: useQueryParamsArray[1]
  };
  // @ts-ignore
  const clearParams = useClearParams(Object.keys(filtersState), true);

  const handleSelectOption = (option: Option) => {
    option.label.toLowerCase() === 'all' && clearParams();
    setSelectedOption(option);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>, option?: Option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      option && handleSelectOption(option);
    }
  };

  useEffect(() => {
    if (selectedOption.label.toLocaleLowerCase() !== 'all') {
      // @ts-ignore
      filtersState[category].setParam(selectedOption.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const options = (option: Option, index: number) => {
    return (
      <li
        className={classNames(css.option, {
          [css.selected]: selectedOption?.label === option.label
        })}
        role="option"
        aria-selected={selectedOption?.label === option.label}
        onClick={() => handleSelectOption(option)}
        onKeyDown={(event) => handleKeyPress(event, option)}
        tabIndex={0}
        key={index}
      >
        <IconCircle className={css.circle} isActive={selectedOption?.label === option.label}>
          <CheckmarkSvg className={css.checkmark} />
        </IconCircle>
        <span className={css.label}>{option.label}</span>
      </li>
    );
  };

  return (
    <div className={classNames('FilterDropdownModalOptions', css.root, className)}>
      <div className={css.header}>{header}</div>
      {Object.values(content)?.map((category, index) => (
        <div className={css.wrapper} key={index}>
          {category.title && <div className={css.title}>{category.title}</div>}
          <ul className={css.options} role="listbox" aria-labelledby="dropdown-toggle" id={'dropdown-options-' + index}>
            {category.options.map((option, index) => options(option, index))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default memo(FilterDropdownModalOptions);
