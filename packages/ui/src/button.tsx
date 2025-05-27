"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "lg" | "sm";
  classname?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`rounded ${props.classname} ${props.variant == "primary" ? "text-white bg-blue-600 hover:bg-blue-700" : "text-blue-600 bg-blue-100 hover:bg-blue-200"} ${props.size == "lg" ? "px-4 py-2" : "px-2 py-1"}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
