import { FC, memo, useState } from 'react';
import classNames from 'classnames';

import css from './FilterDropdownModalOptions.module.scss';

import IconCircle from '@/components/IconCircle/IconCircle';

import CheckmarkSvg from '@/components/svgs/white-checkmark.svg';

interface Option {
  label: string;
  value: string;
}

export type FilterDropdownModalOptionsProps = {
  className?: string;
  header?: string;
  categories: { title?: string; options: Option[] }[];
  onSelectOption?: (option: string) => void;
};

const FilterDropdownModalOptions: FC<FilterDropdownModalOptionsProps> = ({ className, header, categories }) => {
  const [selectedOption, setSelectedOption] = useState<Option>(categories[0].options[0]);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>, option?: Option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      option && handleSelectOption(option);
    }
  };

  const options = (option: Option, index: number) => {
    return (
      <li
        className={classNames(css.option, { [css.selected]: selectedOption?.value === option.value })}
        role="option"
        aria-selected={selectedOption?.value === option.value}
        onClick={() => handleSelectOption(option)}
        onKeyDown={(event) => handleKeyPress(event, option)}
        tabIndex={0}
        key={index}
      >
        <IconCircle className={css.circle} isActive={selectedOption?.value === option.value}>
          <CheckmarkSvg className={css.checkmark} />
        </IconCircle>
        <span className={css.label}>{option.label}</span>
      </li>
    );
  };

  return (
    <div className={classNames('FilterDropdownModalOptions', css.root, className)}>
      <div className={css.header}>{header}</div>
      {categories.map((category, index) => (
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
