import React, { useState, useEffect } from 'react';

import Content from './Content';

function AllData () {
    const [ fetchedData, setFetchedData ] = useState("fetch");

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_FETCH_URI }/fetch`)
            .then(res => res.json())
            .then((result) => {
                setFetchedData(result);
            }, (error) => console.error(error));
    }, []);

    return (
        <div>
            <Content data={ fetchedData } />
        </div>
    );
}

export default AllData;
