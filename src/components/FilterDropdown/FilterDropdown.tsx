import { FC, memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import css from './FilterDropdown.module.scss';

import { variants } from '@/data/variants';

import FilterDropdownModal from '@/components/FilterDropdownModal/FilterDropdownModal';
import FilterDropdownModalOptions from '@/components/FilterDropdownModalOptions/FilterDropdownModalOptions';

import CaretSvg from '@/components/svgs/caret.svg';

interface Option {
  label: string;
}

export type FilterDropdownProps = {
  className?: string;
  title: string;
  categoryOverride?: string;
  categories: { title?: string; options: Option[] }[];
  variant?: variants;
  index: number;
};

const FilterDropdown: FC<FilterDropdownProps> = ({
  className,
  title,
  categoryOverride,
  categories,
  index,
  variant = variants.LIGHT
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
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
      className={classNames('FilterDropdown', css.root, className, {
        [css.open]: isOpen,
        [css.dark]: variant === variants.DARK
      })}
      ref={dropdownRef}
      tabIndex={0}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls="dropdown-options"
      onKeyDown={(event) => handleKeyPress(event)}
      onClick={handleToggleDropdown}
      id={'dropdown-toggle-' + index}
      role="combobox"
    >
      <div className={css.title}>
        {title} <CaretSvg className={css.caret} />
      </div>

      <FilterDropdownModal isOpen={isOpen}>
        <FilterDropdownModalOptions category={categoryOverride ?? title} content={categories} />
      </FilterDropdownModal>
    </div>
  );
};

export default memo(FilterDropdown);
