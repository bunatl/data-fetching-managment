const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');
const { company } = require('../staticDB/db');

const staticDB = require('../staticDB/db');


// types
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  description: 'This return employee properties',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    position: { type: GraphQLNonNull(GraphQLString) }
  })
});

const DepartmentType = new GraphQLObjectType({
  name: 'Deparment',
  description: 'This return department properties',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    employees: { type: GraphQLList(GraphQLNonNull(EmployeeType)) }
  })
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: 'This return company properties',
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    departments: { type: GraphQLList(GraphQLNonNull(GraphQLInt)) },
    department: {
      type: GraphQLList(DepartmentType),
      resolve: company => { //staticDB.departments[ 1 ]//staticDB.departments.find(department => department.id === 1)
        let res = [];
        // iterate through the list of departments in a company
        company.departments.forEach(departmentID => {
          // if ID matches with department in the list of all departments - add it to the result array
          staticDB.departments.find(x => {
            x.id === departmentID ? res.push(x) : '';
            return x.id === departmentID;
          });

        });
        return res;
      }
    }
  })
});



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
    }
  })
});


// scheme
const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;