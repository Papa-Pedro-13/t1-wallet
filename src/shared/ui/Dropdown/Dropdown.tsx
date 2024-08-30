import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.css';
import { User } from '../../../features/user/model/types/user';
import { CFO } from '../../../features/cfoList/model/types';

interface DropdownProps {
  reload: boolean;
  placeholder?: string;
  options: User[] | CFO[];
  disabled?: boolean;
  required?: boolean;
  onSelect: (selectedOption: User | CFO) => void;
}
const getFullName = (user: User) => {
  return user.firstname + ' ' + user.surname + ' ' + user.lastname;
};
function isUser(option: User | CFO): option is User {
  return (option as User).email !== undefined;
}

function getCFOAndUserName(value: User | CFO) {
  if (isUser(value)) {
    return getFullName(value);
  } else {
    return value.title;
  }
}

function compareNames(option: User | CFO, compareString: string) {
  return getCFOAndUserName(option)
    .toLowerCase()
    .includes(compareString.toLowerCase());
}

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
    return compareNames(option, searchTerm);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option: User | CFO) => {
    setSearchTerm(getCFOAndUserName(option));
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
                backgroundColor: compareNames(option, searchTerm)
                  ? '#f0f0f0'
                  : '#fff',
              }}
            >
              {getCFOAndUserName(option)}
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
