import type { InputHTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IInputProps) => {
  return <input className="border border-gray-300 p-2 rounded" {...rest} />;
};

export default Input;
