import { FC, memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import css from './Searchbar.module.scss';

import CloseSVG from '@/components/svgs/close.svg';

export type SearchbarProps = {
  className?: string;
  label: string;
  cleanLabel: string;
  onSearch: (searchText: string) => void;
};

const Searchbar: FC<SearchbarProps> = ({ className, label, cleanLabel, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchText);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <form className={classNames('Searchbar', css.root, className)}>
      <label htmlFor="search-input" className={css.srOnly}>
        {label}
      </label>
      <input
        className={css.input}
        id="search-input"
        type="text"
        placeholder={label}
        value={searchText}
        onChange={handleInputChange}
      />
      {searchText && <CloseSVG className={css.icon} alt={cleanLabel} onClick={() => setSearchText('')} />}
    </form>
  );
};

export default memo(Searchbar);
