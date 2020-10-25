import React, { useContext } from 'react';
import { Content } from './Content';
import { SelectContext } from './App';
import { useQuery } from '@apollo/react-hooks';
import { getQuery } from '../utils/getQuery';

export const GraphQL = () => {
    const { selectValue } = useContext(SelectContext);
    const { data, loading, error } = useQuery(getQuery(selectValue));


    if (loading) return <p>Relax, it's worth the wait...</p>;
    if (error) return <p>Looks like we've got a problem...</p>;
    console.log(data);
    return (
        <div>
            <h2>GraphQL version</h2>
            <Content data={ data } />
        </div>
    );
};
