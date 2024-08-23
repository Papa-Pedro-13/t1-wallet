import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.css';

interface SearchableDropdownProps {
  reload: boolean;
  placeholder?: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  placeholder = 'Поиск...',
  options,
  reload,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setSearchTerm('');
    setIsOpen(false);
  }, [reload]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option: string) => {
    setSearchTerm(option);
    setIsOpen(false);
    onSelect(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <input
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
        onClick={toggleDropdown}
        placeholder={placeholder}
        className={styles.input}
      />
      {isOpen && (
        <ul className={styles.list}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={styles.option}
              style={{
                backgroundColor: searchTerm === option ? '#f0f0f0' : '#fff',
              }}
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className={styles.bad}>Не найдено</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
