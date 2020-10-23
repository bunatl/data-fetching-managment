import React, { useState, useEffect } from 'react';

import { Content } from './Content';

export const Fetch = () => {
    const [ fetchedData, setFetchedData ] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch`);
                const resultJSON = await res.json();
                setFetchedData(resultJSON.text);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Fetch version</h2>
            <Content data={ fetchedData } />
        </div>
    );
};
