import { GraphQLServer } from 'graphql-yoga';
import { uuid } from 'uuidv4'

let posts = []

const typeDefs = `
  type Post {
    id: String!
    title: String!
    content: String!
  }

  input InputPost {
    title: String!
    content: String!
  }

  type Query {
    posts: [Post!]!
    post(id: String!): Post
  }

  type Mutation {
    createPost(data: InputPost): Post!
    updatePost(id: String!, data: InputPost): Post!
    deletePost(id: String!): String!
  }
`

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_, {id}) => {
      const post = posts.find(findPost => findPost.id === id);

      return post
    }
  },

  Mutation: {
    createPost: (_, {data}) => {
      const id = uuid();

      const post = {
        id,
        ...data
      }

      posts.push(post);

      return post
    },

    updatePost: (_, {id, data}) => {
      const {title, content} = data;

      const post = {
        id,
        title,
        content
      }

      const postsUpdated = posts.map(findPost => findPost.id === id ? post : findPost);

      posts = postsUpdated;

      return post
    },

    deletePost: (_, {id}) => {
      const findPostIndex = posts.findIndex(findPost => findPost.id === id);

      if(!findPostIndex) {
        return false;
      }

      posts.splice(findPostIndex, 1);

      return id;
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('Server is running on localhost:4000'))