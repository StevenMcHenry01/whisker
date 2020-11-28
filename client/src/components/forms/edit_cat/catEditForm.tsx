// 3rd party imports
import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'
import { FaUserAlt } from 'react-icons/fa'

// my imports
import styles from '../shared/Form.module.scss'
import { Cat, useEditCatMutation } from '../../../generated/graphql'

interface FormValues {
  name?: string
  bio?: string
  age?: number
  breed?: string
}

interface CatEditFormProps {
  cat: Cat
}

export const CatEditForm = ({ cat }: CatEditFormProps) => {
  const { handleSubmit, errors, register, setError, setValue } = useForm()
  const [editCat] = useEditCatMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  useEffect(() => {
    if (cat) {
      setValue('name', cat.name)
      setValue('age', cat.age)
      setValue('breed', cat.breed)
      setValue('bio', cat.bio)
    }
  }, [cat])

  const onSubmit = async (values: FormValues) => {
    const age = parseInt((values.age as unknown) as string)
    let response
    try {
      response = await editCat({
        variables: { id: cat.id, ...values, age: age },
      })
    } catch (error) {
      console.log(error)
    }

    console.log(response)

    if (response?.data?.editCat?.errors) {
      if (response?.data?.editCat?.errors![0]?.field === 'name') {
        setError('name', {
          type: 'manual',
          message: response.data.editCat.errors[0].message,
        })
      }
      if (response?.data?.editCat?.errors![0]?.field === 'age') {
        setError('age', {
          type: 'manual',
          message: response.data.editCat.errors[0].message,
        })
      }
      if (response?.data?.editCat?.errors![0]?.field === 'breed') {
        setError('breed', {
          type: 'manual',
          message: response.data.editCat.errors[0].message,
        })
      }
      if (response?.data?.editCat?.errors![0]?.field === 'bio') {
        setError('bio', {
          type: 'manual',
          message: response.data.editCat.errors[0].message,
        })
      }
    }

    if (response?.data?.editCat.cat) {
      apolloClient.resetStore()
      router.push('/select-cat')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_card}>
      <div className={styles.header}>
        <h2>Edit</h2>
        <h2 className={styles.sub_header}>{cat.name}</h2>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="name"
            placeholder={cat.name}
            type="text"
            ref={register()}
          />
        </div>
        {errors.name && (
          <p className={styles.error_message}>{errors.name.message}</p>
        )}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <FaUserAlt className={styles.input_icon} />
          <input
            className={styles.input_field}
            name="age"
            placeholder={cat.age?.toString()}
            type="text"
            ref={register()}
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
            placeholder={cat.breed as string}
            type="text"
            ref={register()}
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
            placeholder={cat.bio as string}
            ref={register()}
          />
        </div>
        {errors.bio && (
          <p className={styles.error_message}>{errors.bio.message}</p>
        )}
      </div>
      <button className={styles.submit_button} type="submit">
        Edit
      </button>
      <button
        style={{ margin: '-1rem auto 0 auto', backgroundColor: '#dd7474' }}
        className={styles.submit_button}
        onClick={() => router.push('/select-cat')}
      >
        Cancel
      </button>
    </form>
  )
}
