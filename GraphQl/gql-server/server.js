const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors')
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');

const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// const typeDefs = `
// type Query {
//   hello(name: String): String!
// }
// `;
// const resolvers = {
//     Query: {
//         hello: (_, { name }) => `Hello ${name || 'World'}`,
//     },
// };
// const myGraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
// const PORT = 4000
// const app = express()

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }))
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// console.log(`Server listening on http://localhost:${PORT} ...`)
// app.listen(PORT)

// ***** GRAPHQL SCHEMA
// GraphQL Interface Definition Language (IDL)

const coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
];

const schema = buildSchema(`
    type Query {
        hello: String
        allCourses: [Course]
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

// ***** RESOLVER
const hello = () => {
  return 'Hello World'
}
const updateCourseTopic = function ({ id, topic }) {
  coursesData.map(course => {
    if (course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter(course => course.id === id)[0];
}
const getCourse = args => {
  const id = args.id;
  return coursesData.filter(course => {
    return course.id == id;
  })[0];
}
const getAllCourses = () => {
  return coursesData;
}
const getCourses = args => {
  if (args.topic) {
    const topic = args.topic;
    return coursesData.filter(course => course.topic === topic);
  } else {
    return coursesData;
  }
}

// ***** ROOT
const root = {
  hello: hello,
  allCourses: getAllCourses,
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic
}

const app = express();
app.use(cors()) // not having cors enabled will cause an access control error
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true // GraphQL UI which can directly write your queries in the browser and try out the endpoint.
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));