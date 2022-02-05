import React, { InputHTMLAttributes } from "react";

import "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  };

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleOnChange}
    />
  );
};

export default Input;
