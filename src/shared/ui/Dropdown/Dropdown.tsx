import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.css';
import { User } from '../../../features/user/model/types/user';

interface DropdownProps {
  reload: boolean;
  placeholder?: string;
  options: User[];
  disabled?: boolean;
  required?: boolean;
  onSelect: (selectedOption: User) => void;
}
const getFullName = (user: User) => {
  return user.firstname + ' ' + user.surname + ' ' + user.lastname;
};
const Dropdown: React.FC<DropdownProps> = ({
  placeholder = 'Поиск...',
  options,
  reload,
  disabled = false,
  onSelect,
  required,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setSearchTerm('');
    setIsOpen(false);
  }, [reload]);

  const filteredOptions = options.filter((option) => {
    if (getFullName(option).toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option: User) => {
    setSearchTerm(getFullName(option));
    setIsOpen(false);
    onSelect(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.inputContainer}>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          disabled={disabled}
          // onBlur={() => setIsOpen(false)}
          // onFocus={() => setIsOpen(true)}
          required={required}
          onClick={toggleDropdown}
          className={styles.input}
        />
        <label
          className={`${styles.placeholder} ${searchTerm ? styles.shrink : ''}`}
        >
          {placeholder}
        </label>
      </div>
      {isOpen && (
        <ul className={styles.list}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={styles.option}
              style={{
                backgroundColor:
                  searchTerm === getFullName(option) ? '#f0f0f0' : '#fff',
              }}
            >
              {getFullName(option)}
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

export default Dropdown;
