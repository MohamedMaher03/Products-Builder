import React from "react";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return message ? (
    <span className="mt-1 text-sm text-red-600">{message}</span>
  ) : null;
};

export default ErrorMessage;
