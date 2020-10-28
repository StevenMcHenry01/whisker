// 3rd party imports
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/core'
import React from 'react'
import { DeepMap, FieldError, Validate } from 'react-hook-form'

// My imports

interface InputFieldProps {
  errors: DeepMap<Record<string, any>, FieldError>,
  validator: Validate | Record<string, Validate> | undefined,
  register: any,
  fieldName: string,
  type?: string,
}

export const InputField: React.FC<InputFieldProps> = ({
  errors,
  register,
  validator,
  fieldName,
  type = 'text',
}: InputFieldProps) => {
  return (
    <FormControl isInvalid={errors[fieldName]}>
      <FormLabel htmlFor={fieldName}>
        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
      </FormLabel>
      <Input
        name={fieldName}
        type={type}
        placeholder={fieldName}
        ref={register({ validate: validator })}
      />
      <FormErrorMessage>
        {errors[fieldName] && errors[fieldName].message}
      </FormErrorMessage>
    </FormControl>
  )
}
