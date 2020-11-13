import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<MeResponse>;
  getCats: CatsResponse;
};


export type QueryGetCatsArgs = {
  id?: Maybe<Scalars['Float']>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  user?: Maybe<User>;
  selectedCat?: Maybe<Cat>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  cats: Array<Cat>;
  pics: Array<Pic>;
};

export type Cat = {
  __typename?: 'Cat';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  bio?: Maybe<Scalars['String']>;
  breed?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['String']>;
  owner: User;
  matches: Array<Match>;
  likes: Array<Like>;
  dislikes: Array<Dislike>;
  viewed: Array<Viewed>;
  pics: Array<Pic>;
};

export type Match = {
  __typename?: 'Match';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  match: Cat;
  cat: Cat;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  likesId: Scalars['Float'];
  likerCat: Cat;
};

export type Dislike = {
  __typename?: 'Dislike';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  dislikesId: Scalars['Float'];
  dislikerCat: Cat;
};

export type Viewed = {
  __typename?: 'Viewed';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  viewedId: Scalars['Float'];
  viewerCat: Cat;
};

export type Pic = {
  __typename?: 'Pic';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  user?: Maybe<User>;
  cat?: Maybe<Cat>;
};

export type CatsResponse = {
  __typename?: 'CatsResponse';
  errors?: Maybe<Array<FieldError>>;
  cats?: Maybe<Array<Cat>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  chooseCat: CatResponse;
  uploadUserPhoto: Scalars['Boolean'];
  createCat: CatResponse;
  editCat: CatResponse;
  deleteCat: Scalars['Boolean'];
  likeCat: LikeResponse;
  dislikeCat: DislikeResponse;
  uploadCatPhoto: Scalars['Boolean'];
  sendMessage: MessageResponse;
};


export type MutationChangePasswordArgs = {
  options: NewPasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationChooseCatArgs = {
  id: Scalars['Float'];
};


export type MutationUploadUserPhotoArgs = {
  file: Scalars['Upload'];
};


export type MutationCreateCatArgs = {
  options: CreateCatInput;
};


export type MutationEditCatArgs = {
  options: EditCatInput;
};


export type MutationDeleteCatArgs = {
  id: Scalars['Float'];
};


export type MutationLikeCatArgs = {
  id: Scalars['Float'];
};


export type MutationDislikeCatArgs = {
  id: Scalars['Float'];
};


export type MutationUploadCatPhotoArgs = {
  file: Scalars['Upload'];
};


export type MutationSendMessageArgs = {
  options: MessageInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type NewPasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

export type CatResponse = {
  __typename?: 'CatResponse';
  errors?: Maybe<Array<FieldError>>;
  cat?: Maybe<Cat>;
};


export type CreateCatInput = {
  name: Scalars['String'];
  age?: Maybe<Scalars['Float']>;
  breed?: Maybe<Scalars['String']>;
  sex: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type EditCatInput = {
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  breed?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  errors?: Maybe<Array<FieldError>>;
  match?: Maybe<Cat>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DislikeResponse = {
  __typename?: 'DislikeResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  errors?: Maybe<Array<FieldError>>;
  chatSession?: Maybe<ChatSession>;
};

export type ChatSession = {
  __typename?: 'ChatSession';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  catOneId: Scalars['Float'];
  catTwoId: Scalars['Float'];
  messages?: Maybe<Array<Message>>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  body: Scalars['String'];
  chatSession: ChatSession;
};

export type MessageInput = {
  recieverId: Scalars['Float'];
  body: Scalars['String'];
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) }
);

export type CreateCatMutationVariables = Exact<{
  name: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  sex: Scalars['String'];
  breed?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
}>;


export type CreateCatMutation = (
  { __typename?: 'Mutation' }
  & { createCat: (
    { __typename?: 'CatResponse' }
    & { cat?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'name' | 'breed'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type EditCatMutationVariables = Exact<{
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  sex?: Maybe<Scalars['String']>;
  breed?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
}>;


export type EditCatMutation = (
  { __typename?: 'Mutation' }
  & { editCat: (
    { __typename?: 'CatResponse' }
    & { cat?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'id' | 'name' | 'bio' | 'age' | 'sex' | 'latitude' | 'longitude' | 'breed'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetAllCatsQueryVariables = Exact<{
  id?: Maybe<Scalars['Float']>;
}>;


export type GetAllCatsQuery = (
  { __typename?: 'Query' }
  & { getCats: (
    { __typename?: 'CatsResponse' }
    & { cats?: Maybe<Array<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'bio' | 'name' | 'latitude' | 'longitude' | 'createdAt' | 'age' | 'sex' | 'breed' | 'id'>
      & { pics: Array<(
        { __typename?: 'Pic' }
        & Pick<Pic, 'url'>
      )>, owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'MeResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, selectedCat?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'id' | 'name'>
    )> }
  )> }
);


export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(options: {token: $token, newPassword: $newPassword}) {
    user {
      username
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCatDocument = gql`
    mutation CreateCat($name: String!, $bio: String, $age: Float, $sex: String!, $breed: String, $latitude: Float, $longitude: Float) {
  createCat(
    options: {name: $name, bio: $bio, age: $age, sex: $sex, breed: $breed, latitude: $latitude, longitude: $longitude}
  ) {
    cat {
      name
      breed
      owner {
        username
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateCatMutationFn = Apollo.MutationFunction<CreateCatMutation, CreateCatMutationVariables>;

/**
 * __useCreateCatMutation__
 *
 * To run a mutation, you first call `useCreateCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCatMutation, { data, loading, error }] = useCreateCatMutation({
 *   variables: {
 *      name: // value for 'name'
 *      bio: // value for 'bio'
 *      age: // value for 'age'
 *      sex: // value for 'sex'
 *      breed: // value for 'breed'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useCreateCatMutation(baseOptions?: Apollo.MutationHookOptions<CreateCatMutation, CreateCatMutationVariables>) {
        return Apollo.useMutation<CreateCatMutation, CreateCatMutationVariables>(CreateCatDocument, baseOptions);
      }
export type CreateCatMutationHookResult = ReturnType<typeof useCreateCatMutation>;
export type CreateCatMutationResult = Apollo.MutationResult<CreateCatMutation>;
export type CreateCatMutationOptions = Apollo.BaseMutationOptions<CreateCatMutation, CreateCatMutationVariables>;
export const EditCatDocument = gql`
    mutation EditCat($id: Float!, $name: String, $bio: String, $age: Float, $sex: String, $breed: String, $latitude: Float, $longitude: Float) {
  editCat(
    options: {id: $id, name: $name, bio: $bio, age: $age, sex: $sex, breed: $breed, latitude: $latitude, longitude: $longitude}
  ) {
    cat {
      id
      name
      bio
      age
      sex
      latitude
      longitude
      breed
      owner {
        username
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type EditCatMutationFn = Apollo.MutationFunction<EditCatMutation, EditCatMutationVariables>;

/**
 * __useEditCatMutation__
 *
 * To run a mutation, you first call `useEditCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCatMutation, { data, loading, error }] = useEditCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      bio: // value for 'bio'
 *      age: // value for 'age'
 *      sex: // value for 'sex'
 *      breed: // value for 'breed'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useEditCatMutation(baseOptions?: Apollo.MutationHookOptions<EditCatMutation, EditCatMutationVariables>) {
        return Apollo.useMutation<EditCatMutation, EditCatMutationVariables>(EditCatDocument, baseOptions);
      }
export type EditCatMutationHookResult = ReturnType<typeof useEditCatMutation>;
export type EditCatMutationResult = Apollo.MutationResult<EditCatMutation>;
export type EditCatMutationOptions = Apollo.BaseMutationOptions<EditCatMutation, EditCatMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($emailOrUsername: String!, $password: String!) {
  login(options: {emailOrUsername: $emailOrUsername, password: $password}) {
    user {
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      emailOrUsername: // value for 'emailOrUsername'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    user {
      id
      username
      email
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetAllCatsDocument = gql`
    query GetAllCats($id: Float) {
  getCats(id: $id) {
    cats {
      bio
      name
      latitude
      longitude
      createdAt
      age
      sex
      breed
      id
      pics {
        url
      }
      owner {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetAllCatsQuery__
 *
 * To run a query within a React component, call `useGetAllCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCatsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAllCatsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCatsQuery, GetAllCatsQueryVariables>) {
        return Apollo.useQuery<GetAllCatsQuery, GetAllCatsQueryVariables>(GetAllCatsDocument, baseOptions);
      }
export function useGetAllCatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCatsQuery, GetAllCatsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllCatsQuery, GetAllCatsQueryVariables>(GetAllCatsDocument, baseOptions);
        }
export type GetAllCatsQueryHookResult = ReturnType<typeof useGetAllCatsQuery>;
export type GetAllCatsLazyQueryHookResult = ReturnType<typeof useGetAllCatsLazyQuery>;
export type GetAllCatsQueryResult = Apollo.QueryResult<GetAllCatsQuery, GetAllCatsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      username
    }
    selectedCat {
      id
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;