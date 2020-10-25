import { memorySizeOf } from './memorySizeOfObject';

const getEmployees = async (emplListID, noFetches, dataTranfered) => {
    const employees = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/employees`);
    const employeesJSON = await employees.json();

    noFetches++;
    dataTranfered += memorySizeOf(employeesJSON);

    let listOfEmployees = [];
    emplListID.forEach(emplID => {
        employeesJSON.forEach(empl => {
            if (empl.id === emplID)
                listOfEmployees.push({
                    name: empl.name,
                    position: empl.position
                });
        });
    });

    return {
        data: listOfEmployees,
        fetches: noFetches,
        bytes: dataTranfered
    };
};

const getDepartments = async (departmentListID, noFetches, dataTranfered) => {
    const departments = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/departments`);
    const departmentsJSON = await departments.json();

    noFetches++;
    dataTranfered += memorySizeOf(departmentsJSON);

    let departmentObj = [];
    for (const departmentID of departmentListID) {
        for (const dept of departmentsJSON) {
            if (dept.id === departmentID) {
                const { data, fetches, bytes } = await getEmployees(dept.employees, noFetches, dataTranfered);
                noFetches = fetches;
                dataTranfered = bytes;
                departmentObj.push({
                    name: dept.name,
                    employees: data
                });
            }
        };
    };

    return {
        data: departmentObj,
        fetches: noFetches,
        bytes: dataTranfered
    };
};

const getDepartmentsOnly = async (departmentListID, noFetches, dataTranfered) => {
    const departments = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/departments`);
    const departmentsJSON = await departments.json();

    noFetches++;
    dataTranfered += memorySizeOf(departmentsJSON);

    let departmentObj = [];
    for (const departmentID of departmentListID) {
        for (const dept of departmentsJSON) {
            if (dept.id === departmentID) {
                departmentObj.push({
                    name: dept.name,
                });
            }
        };
    };

    return {
        data: departmentObj,
        fetches: noFetches,
        bytes: dataTranfered
    };
};

export const fetchData = async (selectType) => {
    try {
        let noFetches = 0;
        let dataTranfered = 0;
        switch (selectType) {
            case 'Whole DB':
            case 'Company + departments':
            case 'Departments only':
            case 'Company name only':
                const company = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/company`);
                const companyJSON = await company.json();

                noFetches++;
                dataTranfered = memorySizeOf(companyJSON);

                if (selectType === 'Company name only') return { data: companyJSON[ 0 ].name, fetches: noFetches, bytes: dataTranfered };
                if (selectType === 'Departments only') return await getDepartmentsOnly(companyJSON[ 0 ].departments, noFetches, dataTranfered);
                const { data, fetches, bytes } = (selectType === 'Company + departments')
                    ? await getDepartmentsOnly(companyJSON[ 0 ].departments, noFetches, dataTranfered) // dompany + departments
                    : await getDepartments(companyJSON[ 0 ].departments, noFetches, dataTranfered); //whole DB
                return {
                    data: {
                        name: companyJSON[ 0 ].name,
                        departments: data
                    },
                    fetches,
                    bytes
                };
            case 'Employees only':
                const employees = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/employees`);
                const employeesJSON = await employees.json();
                return {
                    data: employeesJSON,
                    fetches: ++noFetches,
                    bytes: memorySizeOf(employeesJSON)
                };
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    }
};
