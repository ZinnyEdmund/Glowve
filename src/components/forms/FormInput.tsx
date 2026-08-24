import React, { type ChangeEvent } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  leading?: React.ReactNode;
  register?: UseFormRegisterReturn;
  error?: FieldError | { message?: string } | undefined;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  autoFocus?: boolean;
};

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  leading,
  register,
  error,
  value,
  onChange,
  autoComplete,
  autoFocus,
}: Props) {
  // only apply controlled props when register is not used
  const controlledProps = register ? {} : { value, onChange };

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leading && (
          <span className="absolute left-3 top-3 text-gray-400">{leading}</span>
        )}
        <input
          id={id}
          {...(register ?? {})}
          {...controlledProps}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={`w-full ${leading ? "pl-10" : "pl-4"} pr-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#755757] focus:border-transparent border-gray-300`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {("message" in error && error.message) || "Invalid value"}
        </p>
      )}
    </div>
  );
}




