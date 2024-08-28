import React from 'react';

import './Input.css';

interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  type = 'text',
  onChange,
  value = '',
  error = false,
  required = false,
}) => {
  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const onClickHandle = () => {
  //   inputRef.current?.focus();
  // };

  return (
    <div className={`input-block ${error ? 'error' : ''}`}>
      <input
        className='input'
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label
        htmlFor={name}
        className={`label ${value !== '' ? 'label--focus' : ''}`}
      >
        {placeholder}
      </label>
    </div>
  );
};
export default Input;
