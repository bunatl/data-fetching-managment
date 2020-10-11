const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
      name: {
        type: GraphQLString,
        resolve: () => 'hello person'
      },
    })
  })
});

module.exports = schema;