// 3rd party imports
import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

// My imports
import { useCreateCatMutation } from '../../../generated/graphql'
import { Upload } from '../../upload/upload'

interface CreateCatFormProps {

}

interface FormValues {
  name: string
  bio?: string
  age?: number
  sex: 'male' | 'female' | 'other'
  breed?: string
}

export const CreateCatForm: React.FC<CreateCatFormProps> = ({ }) => {
  const { handleSubmit, errors, register, formState } = useForm()
  const [createCat] = useCreateCatMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const age = parseInt(values.age as unknown as string)
    const response = await createCat({ variables: { ...values, age: age } })
    if (response.data?.createCat?.cat) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" placeholder="name" type="text" ref={register({ required: true })} />
      {errors.name && "name is required"}
      <div>
        <input name="sex" type="radio" value="male" ref={register({ required: true })} />
        <label>male</label>
        <input name="sex" type="radio" value="female" ref={register({ required: true })} />
        <label>female</label>
        <input name="sex" type="radio" value="other" ref={register({ required: true })} />
        <label>other</label>
      </div>
      <div>
        <input name="age" placeholder="age" type="text" ref={register({ required: true })} />
        {errors.age && "age is required"}
      </div>
      <div>
        <input name="breed" placeholder="breed" type="text" ref={register()} />
      </div>
      <textarea ref={register} name="bio" placeholder="bio" />
      <div>
        <Upload />
      </div>
      <div>
        <button type="submit">Create Cat</button>
      </div>
    </form>
  )
}
