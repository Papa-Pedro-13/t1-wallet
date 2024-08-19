import React from 'react';
import './Button.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  size?: 'normal' | 'large' | 'small';
  disabled?: boolean;
  style?: 'normal' | 'reverse';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  onClick,
  size = 'normal',
  style = 'normal',
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${size} button ${style !== 'normal' ? style : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
