import { FC, memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>(content[0].options[0].label);
  const [paramValue, setParamValue] = useQueryParams(category, []);
  const clearParams = useClearParams([category], true);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>, option?: Option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      option && handleOptionClick(option.label);
    }
  };

  useEffect(() => {
    if (!paramValue && router.query[category]) {
      setSelectedOption(router.query[category] as string);
    }
  }, [category, paramValue, router]);

  useEffect(() => {
    if (paramValue) setSelectedOption(paramValue);
  }, [paramValue]);

  function handleOptionClick(option: string) {
    let newSelectedOption: string;
    if (selectedOption === option) {
      return;
    } else if (option.toLowerCase() === 'all') {
      clearParams();
      setSelectedOption(option);
      return;
    } else {
      newSelectedOption = option;
    }
    setSelectedOption(newSelectedOption);
    setParamValue(newSelectedOption);
  }

  const options = (option: Option, index: number) => {
    return (
      <li
        className={classNames(css.option, {
          [css.selected]: selectedOption === option.label
        })}
        role="option"
        aria-selected={selectedOption === option.label}
        onClick={() => handleOptionClick(option.label)}
        onKeyDown={(event) => handleKeyPress(event, option)}
        tabIndex={0}
        key={index}
      >
        <IconCircle className={css.circle} isActive={selectedOption === option.label}>
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
