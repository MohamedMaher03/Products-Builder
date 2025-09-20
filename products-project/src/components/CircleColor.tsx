import React from "react";

interface ICircleColorProps {
  color: string;
}

const CircleColor = ({ color }: ICircleColorProps) => {
  return (
    <span
      className={`block w-5 h-5 ${color} rounded-full cursor-pointer`}
    ></span>
  );
};

export default CircleColor;
