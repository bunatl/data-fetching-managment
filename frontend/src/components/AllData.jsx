import React, { useState, useEffect } from 'react';

import { Content } from './Content';

export function AllData () {
    const [ fetchedData, setFetchedData ] = useState("fetch");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch`);
                const resultJSON = await result.json();
                setFetchedData(resultJSON.text);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>All fetched Data</h2>
            <Content data={ fetchedData } />
        </div>
    );
}
