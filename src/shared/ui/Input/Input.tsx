import React, { useRef } from 'react';

import './Input.css';

interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  type = 'text',
  onChange,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClickHandle = () => {
    inputRef.current?.focus();
  };

  return (
    <div className='input-block'>
      <input
        className='input'
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label
        onClick={onClickHandle}
        className={`label ${value !== '' ? 'label--focus' : ''}`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
