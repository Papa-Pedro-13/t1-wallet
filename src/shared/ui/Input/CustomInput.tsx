import  { forwardRef, useEffect, useRef } from 'react';

import './Input.css';

interface InputProps {
  placeholder: string;
  type?: string;
  name: string;
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = 'text', name, ...props }, ref) => {
    const myRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      console.log(myRef.current?.value);
    }, [myRef.current?.value]);
    return (
      <div className={`input-block`}>
        <input
          className='input'
          type={type}
          id={name}
          name={name}
          {...props}
          // value={value}
          ref={(node) => {
            myRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          // onChange={() => console.log(myRef.current?.value)}
        />
        <label
          htmlFor={name}
          className={`label  ${
            myRef.current?.value !== '' ? 'label--focus' : ''
          }`}
        >
          {placeholder}
        </label>
      </div>
    );
  }
);

export default CustomInput;
