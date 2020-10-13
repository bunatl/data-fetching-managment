const employees = [
    { id: 1, name: 'Bob', position: 'technician' },
    { id: 2, name: 'Alice', position: 'HR' },
    { id: 3, name: 'Mr. X', position: 'CEO' },
    { id: 4, name: 'Jane', position: 'marketing' },
    { id: 5, name: 'John', position: 'campaigns' }
];

const departments = [
    { id: 1, name: 'IT', employees: [ 1, 2, 3 ] },
    { id: 2, name: 'Sales', employees: [ 4, 5 ] }
];

const company = [ {
    name: 'DreamCompany',
    departments: [ 1, 2 ],
} ];

module.exports = {
    company,
    employees,
    departments
};
