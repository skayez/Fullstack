import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      author
      genres
      id
      published
      title
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres,
    ) {
      title
      author
      published
      genres
    }
  }
`

export const UPDATE_BIRTHYEAR = gql`
  mutation authorEdit($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born,
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      value,
      favouriteGenre
    }
  }
`