import React, { useState, useEffect, useContext } from 'react';
import { Content } from './Content';

import { fetchData } from '../utils/fetchDB';
import { SelectContext } from './App';

export const Fetch = () => {
    const [ fetchedData, setFetchedData ] = useState({});
    const { selectValue } = useContext(SelectContext);

    useEffect(() => {
        const loadData = async () => setFetchedData(await fetchData(selectValue));
        loadData();
    }, [ selectValue ]);

    return (
        <div>
            <h2>Fetch version</h2>
            <Content fetchedObj={ fetchedData } />
        </div>
    );
};
