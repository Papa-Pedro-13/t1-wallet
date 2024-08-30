import React from 'react';
import './Button.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  text: string;

  size?: 'normal' | 'large' | 'small';
  disabled?: boolean;
  style?: 'normal' | 'reverse' | 'green';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  text,
  type = 'button',
  onClick,
  size = 'normal',
  style = 'normal',
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        backgroundColor: `${style === 'green' ? '#88F657' : ''}`,
        borderColor: `${style === 'green' ? '#88F657' : ''}`,
      }}
      className={`${size} button ${style !== 'normal' ? style : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
