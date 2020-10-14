const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

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
        employees: { type: GraphQLList(GraphQLNonNull(GraphQLInt)) },
        employee: {
            type: GraphQLList(EmployeeType),
            description: 'Custum propery for mapping employees to list of employees in a department',
            resolve: department => {
                let res = [];
                // iterate through the list of departments in a company
                department.employees.forEach(employeeID => {
                    // if ID matches with department in the list of all departments - add it to the result array
                    staticDB.employees.find(x => {
                        x.id === employeeID ? res.push(x) : '';
                        return x.id === employeeID;
                    });
                });
                return res;
            }
        }
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
            description: 'Custum propery for mapping departments to list of department in a company',
            resolve: company => {
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

module.exports = {
    EmployeeType,
    DepartmentType,
    CompanyType
}; 