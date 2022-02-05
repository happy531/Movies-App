import React, { InputHTMLAttributes } from "react";

import "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={
        props.onChange
          ? (e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e)
          : undefined
      }
    />
  );
};

export default Input;
