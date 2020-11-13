// 3rd party imports
import React from 'react'
import { DeepMap, FieldError, Validate } from 'react-hook-form'

// My imports

interface InputFieldProps {
  errors: DeepMap<Record<string, any>, FieldError>
  validator: Validate | Record<string, Validate> | undefined
  register: any
  fieldName: string
  fieldLabel: string
  placeholder: string
  type?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  errors,
  register,
  validator,
  fieldName,
  fieldLabel,
  placeholder,
  type = 'text',
}: InputFieldProps) => {
  return (
    <input
      name={fieldName}
      type={type}
      placeholder={placeholder}
      ref={register({ validate: validator })}
    />
  )
}
