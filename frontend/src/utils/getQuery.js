
// queries
import {
    wholeDB,
    companyDepartments,
    departmentsOnly,
    companyNameOnly,
    employeesOnly
} from './graphQLQueries';

export const getQuery = (selectValue) => {
    switch (selectValue) {
        case 'Whole DB':
            return wholeDB;
        case 'Company + departments':
            return companyDepartments;
        case 'Departments only':
            return departmentsOnly;
        case 'Company name only':
            return companyNameOnly;
        case 'Employees only':
            return employeesOnly;
        default:
            return wholeDB;
    }
};
