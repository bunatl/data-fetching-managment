const getEmployees = async (emplListID) => {
    const employees = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/employees`);
    const employeesJSON = await employees.json();

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

    return listOfEmployees;
};

const getDepartmentsOnly = async (departmentListID) => {
    const departments = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/departments`);
    const departmentsJSON = await departments.json();

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

    return departmentObj;
};

const getDepartments = async (departmentListID) => {
    const departments = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/departments`);
    const departmentsJSON = await departments.json();

    let departmentObj = [];
    for (const departmentID of departmentListID) {
        for (const dept of departmentsJSON) {
            if (dept.id === departmentID) {
                departmentObj.push({
                    name: dept.name,
                    employees: await getEmployees(dept.employees)
                });
            }
        };
    };

    return departmentObj;
};

export const fetchData = async (selectType) => {
    try {
        switch (selectType) {
            case 'Whole DB':
            case 'Company + departments':
            case 'Departments only':
            case 'Company name only':
                const company = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/company`);
                const companyJSON = await company.json();
                if (selectType === 'Company name only') return { name: companyJSON[ 0 ].name };
                if (selectType === 'Departments only') return await getDepartmentsOnly(companyJSON[ 0 ].departments);
                return {
                    name: companyJSON[ 0 ].name,
                    departments: (selectType === 'Company + departments')
                        ? await getDepartmentsOnly(companyJSON[ 0 ].departments)
                        : await getDepartments(companyJSON[ 0 ].departments)
                };
            case 'Employees only':
                const employees = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch/employees`);
                return await employees.json();
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    }
};