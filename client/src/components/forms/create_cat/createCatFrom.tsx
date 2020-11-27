// 3rd party imports
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

// My imports
import { useCreateCatMutation } from '../../../generated/graphql'
import { Upload } from '../../upload/upload'
import styles from '../shared/Form.module.scss'
import { FaUserAlt, FaBabyCarriage, FaCat } from 'react-icons/fa'
import { ImBubble } from 'react-icons/im'
import { Button } from '../../utils/buttons/button'
import { RadioButtons } from './radioButtons'
import { InputField } from '../shared/inputField'
import { validator } from './validator'

interface FormValues {
  name: string
  bio?: string
  age?: number
  sex: 'male' | 'female' | 'other'
  breed?: string
}

export const CreateCatForm = () => {
  const { handleSubmit, errors, register, setError } = useForm()
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<number>>([])
  const [createCat] = useCreateCatMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const age = parseInt((values.age as unknown) as string)
    let response
    try {
      response = await createCat({
        variables: { ...values, age: age, photoIds: uploadedPhotos },
      })
    } catch (error) {
      console.error(error)
    }
    if (response?.data?.createCat?.errors) validator({ response, setError })
    if (response?.data?.createCat?.cat) {
      apolloClient.resetStore()
      router.push('/select-cat')
    }
  }

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_card}>
      <InputField
        Icon={FaUserAlt}
        register={register}
        errors={errors}
        name="name"
        placeholder="name"
        required
      />
      <RadioButtons register={register} />
      <InputField
        Icon={FaBabyCarriage}
        register={register}
        errors={errors}
        name="age"
        placeholder="age"
        required
      />
      <InputField
        Icon={FaCat}
        register={register}
        errors={errors}
        name="breed"
        placeholder="breed"
      />

      <div style={{ marginBottom: '1rem' }}>
        <div className={styles.input_container}>
          <ImBubble className={styles.input_icon} />
          <textarea
            className={styles.input_field}
            name="bio"
            placeholder="bio"
            rows={5}
            ref={register()}
          />
        </div>
        {errors.bio && (
          <p className={styles.error_message}>{errors.bio.message}</p>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Upload
          uploadedPhotos={uploadedPhotos}
          setUploadedPhotos={setUploadedPhotos}
          inputName="file1"
        />
        <Upload
          uploadedPhotos={uploadedPhotos}
          setUploadedPhotos={setUploadedPhotos}
          inputName="file2"
        />
        <Upload
          uploadedPhotos={uploadedPhotos}
          setUploadedPhotos={setUploadedPhotos}
          inputName="file3"
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button colorVariant="pink" type="submit">
          Create Cat
        </Button>
      </div>
    </form>
  )
}
