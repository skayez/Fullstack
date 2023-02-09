//const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    findAuthor: async (root, args) => Author.findById(args.id),
    me: (root, args, context) => {
      return context.currentUser
    },
    allBooks: async (root, args) => {
      let results = Book.find({})
      if (args.author) {
        results.find({ "author": args.author })
      }
      if (args.genre) {
        results.find({ "genres": args.genre })
      }
      return results

      /* VANHA KOODI:
      let results = [...books]
      if (typeof args.author === "string") {
        results = results.filter(value => value.author === args.author)
      }
      if (typeof args.genre === "string") {
        results = results.filter(value => value.genres.includes(args.genre))
      }
      return results */
    
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })

      if (author) {
        author.bookCount = (author.bookCount + 1)
        author.save()
      }
      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 })
        author.save()
      }

      const book = new Book({ ...args, author: author.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT', }
        })
      }

      book.save()
        .catch(error => {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        })
      
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book

      /* VANHA KOODI:
      const book = {...args, id: uuid()}
      books = books.concat(book)
      if (!authors.find(value => value.name === args.author)) {
        console.log('placeholder 8.6 tehtävään')
      }
      return book */

    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args, bookCount: 0 })

      return author.save()
        .catch(error => {
          throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      return author.save()

      /* VANHA KOODI:
      const author = authors.find(value => value.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = {...author, born: args.born}
      authors = authors.map((value) => value.name === args.name ? updatedAuthor : value)
      return updatedAuthor */

    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET), favouriteGenre: user.favouriteGenre }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

/* VANHA KOODI:
const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
}) */

module.exports = resolvers
