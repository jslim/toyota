import { FC, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './FilterDropdown.module.scss';

import CaretSvg from '@/components/svgs/caret.svg';
import CheckmarkSvg from '@/components/svgs/white-checkmark.svg';
import IconCircle from '@/components/IconCircle/IconCircle';

interface Option {
  label: string;
  value: string;
}

export type FilterDropdownProps = {
  className?: string;
  title: string;
  alt?: string;
  options: Option[];
  selectedOption: string;
  onSelectOption?: (option: string) => void;
};

const FilterDropdown: FC<FilterDropdownProps> = ({ className, title, alt, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>, option?: Option) => {
    if (event.key === 'Enter' || event.key === ' ') {
      option && handleSelectOption(option);
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classNames('FilterDropdown', css.root, className, { [css.open]: isOpen })}
      ref={dropdownRef}
      tabIndex={0}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls="dropdown-options"
      onKeyDown={(event) => handleKeyPress(event)}
      onClick={handleToggleDropdown}
      id="dropdown-toggle"
      role="combobox"
      aria-label={alt}
    >
      <div className={css.title}>
        {selectedOption ? selectedOption.label : title} <CaretSvg className={css.caret} />
      </div>
      {isOpen && (
        <ul
          className={css.options}
          role="listbox"
          aria-labelledby="dropdown-toggle"
          id="dropdown-options"
          tabIndex={-1}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={classNames(css.option, { [css.selected]: selectedOption?.value === option.value })}
              role="option"
              aria-selected={selectedOption?.value === option.value}
              onClick={() => handleSelectOption(option)}
              onKeyDown={(event) => handleKeyPress(event, option)}
              tabIndex={0}
            >
              <IconCircle className={css.circle} isActive={selectedOption?.value === option.value}>
                <CheckmarkSvg className={css.checkmark} />
              </IconCircle>
              <span className={css.label}>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(FilterDropdown);
