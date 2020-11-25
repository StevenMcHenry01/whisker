// 3rd party imports
import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'

// My imports
import { useLoginMutation } from '../../../generated/graphql'
import styles from '../shared/Form.module.scss'

interface FormValues {
  emailOrUsername: string
  password: string
}

export const LoginForm = () => {
  const { handleSubmit, register } = useForm()
  const [login] = useLoginMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const response = await login({ variables: values })

    if (response.data?.login.user) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <form className={styles.form_card} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h2>Welcome to</h2>
        <h2 className={styles.sub_header}>Whisker.</h2>
      </div>
      <div className={styles.input_container} style={{ marginBottom: '1rem' }}>
        <FaUserAlt className={styles.input_icon} />
        <input
          className={styles.input_field}
          name="emailOrUsername"
          placeholder="email or username"
          type="text"
          ref={register({ required: true })}
        />
      </div>
      <div className={styles.input_container}>
        <AiFillLock className={styles.input_icon} />
        <input
          className={styles.input_field}
          name="password"
          placeholder="password"
          type="password"
          ref={register({ required: true })}
        />
      </div>
      <div className={styles.forgot_password}>
        <Link href="/send-reset-email">Forgot password?</Link>
      </div>
      <button className={styles.submit_button} type="submit">
        Login
      </button>
      <div className={styles.sign_up}>
        Don&apos;t have an account yet?{' '}
        <span>
          <Link href="/register">Sign up</Link>
        </span>
      </div>
    </form>
  )
}
