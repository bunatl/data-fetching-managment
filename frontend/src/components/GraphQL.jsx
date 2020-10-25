import React, { useContext } from 'react';
import { Content } from './Content';
import { SelectContext } from './App';
import { useQuery } from '@apollo/react-hooks';
import { getQuery } from '../utils/getQuery';

import { memorySizeOf } from '../utils/memorySizeOfObject';

export const GraphQL = () => {
    const { selectValue } = useContext(SelectContext);
    const { data, loading, error } = useQuery(getQuery(selectValue));

    if (loading) return <p>Data are still being loaded</p>;
    if (error) return <p>Looks like we've got a problem...</p>;
    return (
        <div>
            <h2>GraphQL version</h2>
            <Content fetchedObj={ {
                data,
                fetches: 1,
                bytes: memorySizeOf(data)
            } } />
        </div>
    );
};
