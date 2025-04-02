import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <select
      className={`p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export function SelectItem({ children, ...props }: SelectItemProps) {
  return <option {...props}>{children}</option>;
}
