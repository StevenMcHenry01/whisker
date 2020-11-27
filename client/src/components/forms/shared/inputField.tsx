// 3rd party imports
import React from 'react'
import { IconType } from 'react-icons/lib'

// My imports
import styles from './Form.module.scss'

interface InputFieldProps {
  register: any
  errors: any
  Icon: IconType
  name: string
  placeholder: string
  required?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  register,
  errors,
  Icon,
  name,
  placeholder,
  required = false,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div className={styles.input_container}>
        <Icon className={styles.input_icon} />
        <input
          className={styles.input_field}
          name={name}
          placeholder={placeholder}
          type="text"
          ref={register(required ? { required: `${name} is required` } : null)}
        />
      </div>
      {errors[name] && (
        <p className={styles.error_message}>{errors[name].message}</p>
      )}
    </div>
  )
}
