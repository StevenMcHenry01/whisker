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
  getUserCats: CatsResponse;
  getCats: CatsResponse;
  getCat: CatResponse;
  getMatches: MatchesResponse;
  getChatSession: SessionResponse;
};


export type QueryGetCatsArgs = {
  id?: Maybe<Scalars['Float']>;
};


export type QueryGetCatArgs = {
  id: Scalars['Float'];
};


export type QueryGetChatSessionArgs = {
  id: Scalars['Float'];
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
  matchCatId: Scalars['Float'];
  chatSessionId: Scalars['Float'];
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

export type CatResponse = {
  __typename?: 'CatResponse';
  errors?: Maybe<Array<FieldError>>;
  cat?: Maybe<Cat>;
};

export type MatchesResponse = {
  __typename?: 'MatchesResponse';
  errors?: Maybe<Array<FieldError>>;
  matches?: Maybe<Array<Match>>;
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
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
  senderId: Scalars['Float'];
  chatSession: ChatSession;
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
  id: Scalars['Float'];
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
  message?: Maybe<Message>;
};

export type MessageInput = {
  receiverId: Scalars['Float'];
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

export type ChooseCatMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ChooseCatMutation = (
  { __typename?: 'Mutation' }
  & { chooseCat: (
    { __typename?: 'CatResponse' }
    & { cat?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'name'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
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

export type DislikeCatMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DislikeCatMutation = (
  { __typename?: 'Mutation' }
  & { dislikeCat: (
    { __typename?: 'DislikeResponse' }
    & Pick<DislikeResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
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

export type LikeCatMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LikeCatMutation = (
  { __typename?: 'Mutation' }
  & { likeCat: (
    { __typename?: 'LikeResponse' }
    & Pick<LikeResponse, 'success'>
    & { match?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'name'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
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

export type SendMessageMutationVariables = Exact<{
  body: Scalars['String'];
  receiverId: Scalars['Float'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'MessageResponse' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'body' | 'senderId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UploadCatPhotoMutationVariables = Exact<{
  file: Scalars['Upload'];
  id: Scalars['Float'];
}>;


export type UploadCatPhotoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadCatPhoto'>
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

export type GetCatQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetCatQuery = (
  { __typename?: 'Query' }
  & { getCat: (
    { __typename?: 'CatResponse' }
    & { cat?: Maybe<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'id' | 'name' | 'age' | 'bio' | 'breed' | 'sex'>
      & { pics: Array<(
        { __typename?: 'Pic' }
        & Pick<Pic, 'url'>
      )>, owner: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
        & { pics: Array<(
          { __typename?: 'Pic' }
          & Pick<Pic, 'url'>
        )> }
      ) }
    )> }
  ) }
);

export type GetChatSessionQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetChatSessionQuery = (
  { __typename?: 'Query' }
  & { getChatSession: (
    { __typename?: 'SessionResponse' }
    & { chatSession?: Maybe<(
      { __typename?: 'ChatSession' }
      & { messages?: Maybe<Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'body' | 'senderId'>
      )>> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetMatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMatchesQuery = (
  { __typename?: 'Query' }
  & { getMatches: (
    { __typename?: 'MatchesResponse' }
    & { matches?: Maybe<Array<(
      { __typename?: 'Match' }
      & Pick<Match, 'matchCatId' | 'chatSessionId'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetUserCatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCatsQuery = (
  { __typename?: 'Query' }
  & { getUserCats: (
    { __typename?: 'CatsResponse' }
    & { cats?: Maybe<Array<(
      { __typename?: 'Cat' }
      & Pick<Cat, 'bio' | 'name' | 'latitude' | 'longitude' | 'createdAt' | 'age' | 'sex' | 'breed' | 'id'>
      & { pics: Array<(
        { __typename?: 'Pic' }
        & Pick<Pic, 'url'>
      )> }
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
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
export const ChooseCatDocument = gql`
    mutation ChooseCat($id: Float!) {
  chooseCat(id: $id) {
    cat {
      name
    }
    errors {
      field
      message
    }
  }
}
    `;
export type ChooseCatMutationFn = Apollo.MutationFunction<ChooseCatMutation, ChooseCatMutationVariables>;

/**
 * __useChooseCatMutation__
 *
 * To run a mutation, you first call `useChooseCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChooseCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chooseCatMutation, { data, loading, error }] = useChooseCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChooseCatMutation(baseOptions?: Apollo.MutationHookOptions<ChooseCatMutation, ChooseCatMutationVariables>) {
        return Apollo.useMutation<ChooseCatMutation, ChooseCatMutationVariables>(ChooseCatDocument, baseOptions);
      }
export type ChooseCatMutationHookResult = ReturnType<typeof useChooseCatMutation>;
export type ChooseCatMutationResult = Apollo.MutationResult<ChooseCatMutation>;
export type ChooseCatMutationOptions = Apollo.BaseMutationOptions<ChooseCatMutation, ChooseCatMutationVariables>;
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
export const DislikeCatDocument = gql`
    mutation DislikeCat($id: Float!) {
  dislikeCat(id: $id) {
    success
    errors {
      message
    }
  }
}
    `;
export type DislikeCatMutationFn = Apollo.MutationFunction<DislikeCatMutation, DislikeCatMutationVariables>;

/**
 * __useDislikeCatMutation__
 *
 * To run a mutation, you first call `useDislikeCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeCatMutation, { data, loading, error }] = useDislikeCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDislikeCatMutation(baseOptions?: Apollo.MutationHookOptions<DislikeCatMutation, DislikeCatMutationVariables>) {
        return Apollo.useMutation<DislikeCatMutation, DislikeCatMutationVariables>(DislikeCatDocument, baseOptions);
      }
export type DislikeCatMutationHookResult = ReturnType<typeof useDislikeCatMutation>;
export type DislikeCatMutationResult = Apollo.MutationResult<DislikeCatMutation>;
export type DislikeCatMutationOptions = Apollo.BaseMutationOptions<DislikeCatMutation, DislikeCatMutationVariables>;
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
export const LikeCatDocument = gql`
    mutation LikeCat($id: Float!) {
  likeCat(id: $id) {
    success
    match {
      name
    }
    errors {
      message
    }
  }
}
    `;
export type LikeCatMutationFn = Apollo.MutationFunction<LikeCatMutation, LikeCatMutationVariables>;

/**
 * __useLikeCatMutation__
 *
 * To run a mutation, you first call `useLikeCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCatMutation, { data, loading, error }] = useLikeCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeCatMutation(baseOptions?: Apollo.MutationHookOptions<LikeCatMutation, LikeCatMutationVariables>) {
        return Apollo.useMutation<LikeCatMutation, LikeCatMutationVariables>(LikeCatDocument, baseOptions);
      }
export type LikeCatMutationHookResult = ReturnType<typeof useLikeCatMutation>;
export type LikeCatMutationResult = Apollo.MutationResult<LikeCatMutation>;
export type LikeCatMutationOptions = Apollo.BaseMutationOptions<LikeCatMutation, LikeCatMutationVariables>;
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
export const SendMessageDocument = gql`
    mutation SendMessage($body: String!, $receiverId: Float!) {
  sendMessage(options: {body: $body, receiverId: $receiverId}) {
    message {
      body
      senderId
    }
    errors {
      field
      message
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      body: // value for 'body'
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UploadCatPhotoDocument = gql`
    mutation UploadCatPhoto($file: Upload!, $id: Float!) {
  uploadCatPhoto(file: $file, id: $id)
}
    `;
export type UploadCatPhotoMutationFn = Apollo.MutationFunction<UploadCatPhotoMutation, UploadCatPhotoMutationVariables>;

/**
 * __useUploadCatPhotoMutation__
 *
 * To run a mutation, you first call `useUploadCatPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadCatPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadCatPhotoMutation, { data, loading, error }] = useUploadCatPhotoMutation({
 *   variables: {
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadCatPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadCatPhotoMutation, UploadCatPhotoMutationVariables>) {
        return Apollo.useMutation<UploadCatPhotoMutation, UploadCatPhotoMutationVariables>(UploadCatPhotoDocument, baseOptions);
      }
export type UploadCatPhotoMutationHookResult = ReturnType<typeof useUploadCatPhotoMutation>;
export type UploadCatPhotoMutationResult = Apollo.MutationResult<UploadCatPhotoMutation>;
export type UploadCatPhotoMutationOptions = Apollo.BaseMutationOptions<UploadCatPhotoMutation, UploadCatPhotoMutationVariables>;
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
export const GetCatDocument = gql`
    query GetCat($id: Float!) {
  getCat(id: $id) {
    cat {
      id
      name
      age
      bio
      breed
      sex
      pics {
        url
      }
      owner {
        username
        pics {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGetCatQuery__
 *
 * To run a query within a React component, call `useGetCatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCatQuery(baseOptions: Apollo.QueryHookOptions<GetCatQuery, GetCatQueryVariables>) {
        return Apollo.useQuery<GetCatQuery, GetCatQueryVariables>(GetCatDocument, baseOptions);
      }
export function useGetCatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCatQuery, GetCatQueryVariables>) {
          return Apollo.useLazyQuery<GetCatQuery, GetCatQueryVariables>(GetCatDocument, baseOptions);
        }
export type GetCatQueryHookResult = ReturnType<typeof useGetCatQuery>;
export type GetCatLazyQueryHookResult = ReturnType<typeof useGetCatLazyQuery>;
export type GetCatQueryResult = Apollo.QueryResult<GetCatQuery, GetCatQueryVariables>;
export const GetChatSessionDocument = gql`
    query GetChatSession($id: Float!) {
  getChatSession(id: $id) {
    chatSession {
      messages {
        body
        senderId
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useGetChatSessionQuery__
 *
 * To run a query within a React component, call `useGetChatSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatSessionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChatSessionQuery(baseOptions: Apollo.QueryHookOptions<GetChatSessionQuery, GetChatSessionQueryVariables>) {
        return Apollo.useQuery<GetChatSessionQuery, GetChatSessionQueryVariables>(GetChatSessionDocument, baseOptions);
      }
export function useGetChatSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatSessionQuery, GetChatSessionQueryVariables>) {
          return Apollo.useLazyQuery<GetChatSessionQuery, GetChatSessionQueryVariables>(GetChatSessionDocument, baseOptions);
        }
export type GetChatSessionQueryHookResult = ReturnType<typeof useGetChatSessionQuery>;
export type GetChatSessionLazyQueryHookResult = ReturnType<typeof useGetChatSessionLazyQuery>;
export type GetChatSessionQueryResult = Apollo.QueryResult<GetChatSessionQuery, GetChatSessionQueryVariables>;
export const GetMatchesDocument = gql`
    query GetMatches {
  getMatches {
    matches {
      matchCatId
      chatSessionId
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useGetMatchesQuery__
 *
 * To run a query within a React component, call `useGetMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMatchesQuery(baseOptions?: Apollo.QueryHookOptions<GetMatchesQuery, GetMatchesQueryVariables>) {
        return Apollo.useQuery<GetMatchesQuery, GetMatchesQueryVariables>(GetMatchesDocument, baseOptions);
      }
export function useGetMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchesQuery, GetMatchesQueryVariables>) {
          return Apollo.useLazyQuery<GetMatchesQuery, GetMatchesQueryVariables>(GetMatchesDocument, baseOptions);
        }
export type GetMatchesQueryHookResult = ReturnType<typeof useGetMatchesQuery>;
export type GetMatchesLazyQueryHookResult = ReturnType<typeof useGetMatchesLazyQuery>;
export type GetMatchesQueryResult = Apollo.QueryResult<GetMatchesQuery, GetMatchesQueryVariables>;
export const GetUserCatsDocument = gql`
    query GetUserCats {
  getUserCats {
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
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useGetUserCatsQuery__
 *
 * To run a query within a React component, call `useGetUserCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCatsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCatsQuery, GetUserCatsQueryVariables>) {
        return Apollo.useQuery<GetUserCatsQuery, GetUserCatsQueryVariables>(GetUserCatsDocument, baseOptions);
      }
export function useGetUserCatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCatsQuery, GetUserCatsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserCatsQuery, GetUserCatsQueryVariables>(GetUserCatsDocument, baseOptions);
        }
export type GetUserCatsQueryHookResult = ReturnType<typeof useGetUserCatsQuery>;
export type GetUserCatsLazyQueryHookResult = ReturnType<typeof useGetUserCatsLazyQuery>;
export type GetUserCatsQueryResult = Apollo.QueryResult<GetUserCatsQuery, GetUserCatsQueryVariables>;
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