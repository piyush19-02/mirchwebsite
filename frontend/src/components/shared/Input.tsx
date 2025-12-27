import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}
export function Input({
  label,
  error,
  multiline = false,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;
  const baseStyles = 'flex w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-sm placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
  return <div className="w-full space-y-2">
      {label && <label htmlFor={inputId} className="text-sm font-medium leading-none text-amber-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>}

      {multiline ? <textarea id={inputId} className={`${baseStyles} min-h-[100px] ${errorStyles} ${className}`} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} /> : <input id={inputId} className={`${baseStyles} ${errorStyles} ${className}`} {...props} />}

      {error && <p className="text-sm font-medium text-red-600 animate-in slide-in-from-top-1">
          {error}
        </p>}
    </div>;
}