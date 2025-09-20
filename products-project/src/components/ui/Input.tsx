import type { InputHTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IInputProps) => {
  return (
    <input
      className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      {...rest}
    />
  );
};

export default Input;
