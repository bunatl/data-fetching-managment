import { gql } from '@apollo/client';

export const wholeDB = gql`
query getWholeDB {
  company {
    name
    department {
      id
      name
      employee {
        id
        name
        position
      }
    }
  }
}`;

export const companyDepartments = gql`
query companyDepartments {
  company {
    name
    department {
      name
    }
  }
}`;

export const departmentsOnly = gql`{
  company {
    department {
      name
    }
  }
}`;

export const companyNameOnly = gql`{
  company {
    name
  }
}`;

export const employeesOnly = gql`{
  company {
    department {
      employee {
        id
        name
        position
      }
    }
  }
}`;
