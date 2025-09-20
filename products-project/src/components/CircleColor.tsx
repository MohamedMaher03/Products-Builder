import React, { type HTMLAttributes } from "react";

interface ICircleColorProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: ICircleColorProps) => {
  return (
    <span
      className={`block w-5 h-5 ${color} rounded-full cursor-pointer`}
      {...rest}
    ></span>
  );
};

export default CircleColor;
