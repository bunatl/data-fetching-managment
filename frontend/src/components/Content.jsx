import React from 'react';
import { formatByteSize } from '../utils/memorySizeOfObject';

export const Content = ({ fetchedObj }) => {
    return (
        <div className='content'>
            <div className='size'>Size transfered: <span>{ formatByteSize(fetchedObj.bytes) }</span></div>
            <div className='fetches'>Number of fecthes: <span>{ fetchedObj.fetches }</span></div>
            <div><pre>{ JSON.stringify(fetchedObj.data, null, 2) }</pre></div>
        </div>
    );
};
