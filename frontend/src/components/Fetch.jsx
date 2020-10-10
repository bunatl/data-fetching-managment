import React, { useState, useEffect } from 'react';

import Content from './Content';

function Fetch () {
    const [ fetchedData, setFetchedData ] = useState('');

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch`)
            .then(res => res.json())
            .then((result) => {
                setFetchedData(result);
            }, (error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Fetch version</h2>
            <Content data={ fetchedData } />
        </div>
    );
}

export default Fetch;
