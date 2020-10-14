const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const {
  EmployeeType,
  DepartmentType,
  CompanyType
} = require('./Types');
const staticDB = require('../staticDB/db');


// root queries
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    // name for query
    company: {
      type: new GraphQLList(CompanyType),
      description: 'Return the company',
      resolve: () => staticDB.company
    },
    employee: {
      type: EmployeeType,
      description: 'Return a single employee by id',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => staticDB.employees.find(x => x.id === args.id)
    }
  })
});

// RootMutationType
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addEmployee: {
      type: EmployeeType,
      description: 'Add new Employee into DB',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        position: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const { name, position } = args;
        const newEntry = {
          id: staticDB.employees.length + 1,
          name,
          position
        };
        staticDB.employees.push(newEntry);
        return newEntry;
      }
    },
    delEmployee: {
      type: GraphQLString,
      description: 'Employee will be deleted by given ID',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, { id }) => {
        const index = staticDB.employees.findIndex(x => x.id === id);
        staticDB.employees.splice(index);
        return `Employee with id ${ id } has been delted`;
      }
    }
  })
});


// scheme
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = schema;