import React, { useState, useEffect } from 'react';
import { Content } from './Content';

import { fetchData } from '../utils/fetchDB';

export function AllData () {
    const [ fetchedData, setFetchedData ] = useState({});

    useEffect(() => {
        const loadData = async () => setFetchedData(await fetchData('Whole DB'));
        loadData();
    }, []);

    return (
        <div>
            <h2>Data in DB</h2>
            <Content fetchedObj={ fetchedData } />
        </div>
    );
}
