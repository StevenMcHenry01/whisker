// 3rd party imports
import { useForm } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/router'
import { useRegisterMutation } from '../../../generated/graphql'
import { useApolloClient } from '@apollo/client'
import { FaUserAlt } from 'react-icons/fa'

// my imports
import styles from '../shared/Form.module.scss'
import Link from 'next/link'
import { validator } from './validator'

interface FormValues {
  email: string
  username: string
  password: string
}

export const RegisterForm = () => {
  const { handleSubmit, errors, register: formRegister, setError } = useForm()
  const [register] = useRegisterMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    let response
    try {
      response = await register({ variables: values })
    } catch (error) {
      console.log(error)
    }
    if (response?.data?.register?.errors) validator({ response, setError })
    if (response?.data?.register.user) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_card}>
      <div className={styles.header}>
        <h2>Welcome to</h2>
        <h2 className={styles.sub_header}>Whisker.</h2>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="username"
            placeholder="username"
            type="text"
            ref={formRegister({ required: true })}
          />
        </div>
        {errors.username && (
          <p className={styles.error_message}>{errors.username.message}</p>
        )}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="email"
            placeholder="email"
            type="email"
            ref={formRegister({ required: true })}
          />
        </div>
        {errors.email && (
          <p className={styles.error_message}>{errors.email.message}</p>
        )}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="password"
            placeholder="password"
            type="password"
            ref={formRegister({ required: true })}
          />
        </div>
        {errors.password && (
          <p className={styles.error_message}>{errors.password.message}</p>
        )}
      </div>
      <button className={styles.submit_button} type="submit">
        Sign Up
      </button>
      <div className={styles.sign_up}>
        Already have an account?{' '}
        <span>
          <Link href="/login">Login</Link>
        </span>
      </div>
    </form>
  )
}
