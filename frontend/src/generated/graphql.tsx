import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Letter = {
  __typename?: 'Letter';
  color: Scalars['String'];
  letter: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  word: Word;
};


export type MutationWordArgs = {
  guess: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  answer: Scalars['String'];
  test: Scalars['String'];
};


export type QueryTestArgs = {
  c: Scalars['String'];
};

export type Word = {
  __typename?: 'Word';
  word: Array<Letter>;
};

export type GuessMutationVariables = Exact<{
  guess: Scalars['String'];
}>;


export type GuessMutation = (
  { __typename?: 'Mutation' }
  & { word: (
    { __typename?: 'Word' }
    & { word: Array<(
      { __typename?: 'Letter' }
      & Pick<Letter, 'color' | 'letter'>
    )> }
  ) }
);

export type AnswerQueryVariables = Exact<{ [key: string]: never; }>;


export type AnswerQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'answer'>
);


export const GuessDocument = gql`
    mutation Guess($guess: String!) {
  word(guess: $guess) {
    word {
      color
      letter
    }
  }
}
    `;
export type GuessMutationFn = Apollo.MutationFunction<GuessMutation, GuessMutationVariables>;

/**
 * __useGuessMutation__
 *
 * To run a mutation, you first call `useGuessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGuessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [guessMutation, { data, loading, error }] = useGuessMutation({
 *   variables: {
 *      guess: // value for 'guess'
 *   },
 * });
 */
export function useGuessMutation(baseOptions?: Apollo.MutationHookOptions<GuessMutation, GuessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GuessMutation, GuessMutationVariables>(GuessDocument, options);
      }
export type GuessMutationHookResult = ReturnType<typeof useGuessMutation>;
export type GuessMutationResult = Apollo.MutationResult<GuessMutation>;
export type GuessMutationOptions = Apollo.BaseMutationOptions<GuessMutation, GuessMutationVariables>;
export const AnswerDocument = gql`
    query Answer {
  answer
}
    `;

/**
 * __useAnswerQuery__
 *
 * To run a query within a React component, call `useAnswerQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnswerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnswerQuery({
 *   variables: {
 *   },
 * });
 */
export function useAnswerQuery(baseOptions?: Apollo.QueryHookOptions<AnswerQuery, AnswerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnswerQuery, AnswerQueryVariables>(AnswerDocument, options);
      }
export function useAnswerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnswerQuery, AnswerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnswerQuery, AnswerQueryVariables>(AnswerDocument, options);
        }
export type AnswerQueryHookResult = ReturnType<typeof useAnswerQuery>;
export type AnswerLazyQueryHookResult = ReturnType<typeof useAnswerLazyQuery>;
export type AnswerQueryResult = Apollo.QueryResult<AnswerQuery, AnswerQueryVariables>;