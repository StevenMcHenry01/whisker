// 3rd party imports
import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

// My imports
import { useCreateCatMutation } from '../../../generated/graphql'
import { Upload } from '../../upload/upload'
import styles from '../shared/Form.module.scss'
import { FaUserAlt } from 'react-icons/fa'
import { Button } from '../../utils/buttons/button'

interface FormValues {
  name: string
  bio?: string
  age?: number
  sex: 'male' | 'female' | 'other'
  breed?: string
}

export const CreateCatForm = () => {
  const { handleSubmit, errors, register } = useForm()
  const [createCat] = useCreateCatMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const age = parseInt((values.age as unknown) as string)
    const response = await createCat({ variables: { ...values, age: age } })
    if (response.data?.createCat?.cat) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_card}>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="name"
            placeholder="name"
            type="text"
            ref={register({ required: true })}
          />
        </div>
        {errors.name && (
          <p className={styles.error_message}>{errors.name.message}</p>
        )}
      </div>
      <div className={styles.radio_container}>
        <label className={styles.radio}>
          <span className={styles.radio_input}>
            <input
              name="sex"
              type="radio"
              value="male"
              ref={register({ required: true })}
            />
            <span className={styles.radio_control}></span>
          </span>
          <span className={styles.radio_label}>male</span>
        </label>
        <label className={styles.radio}>
          <span className={styles.radio_input}>
            <input
              name="sex"
              type="radio"
              value="female"
              ref={register({ required: true })}
            />
            <span className={styles.radio_control}></span>
          </span>
          <span className={styles.radio_label}>female</span>
        </label>
        <label className={styles.radio}>
          <span className={styles.radio_input}>
            <input
              name="sex"
              type="radio"
              value="other"
              ref={register({ required: true })}
            />
            <span className={styles.radio_control}></span>
          </span>
          <span className={styles.radio_label}>other</span>
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="age"
            placeholder="age"
            type="text"
            ref={register({ required: true })}
          />
        </div>
        {errors.age && (
          <p className={styles.error_message}>{errors.age.message}</p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="breed"
            placeholder="breed"
            type="text"
            ref={register({ required: true })}
          />
        </div>
        {errors.breed && (
          <p className={styles.error_message}>{errors.breed.message}</p>
        )}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <textarea
            className={styles.input_field}
            name="bio"
            placeholder="bio"
            ref={register()}
          />
        </div>
        {errors.bio && (
          <p className={styles.error_message}>{errors.bio.message}</p>
        )}
      </div>
      <div>
        <Upload />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button colorVariant="pink" type="submit">
          Create Cat
        </Button>
      </div>
    </form>
  )
}
