import React from 'react';
import { memorySizeOf } from '../utils/memorySizeOfObject';

function Content ({ data }) {
    return (
        <div className='content'>
            <div className='objMemSize'>Size transfered: { memorySizeOf(data) }</div>
            <div><pre>{ JSON.stringify(data, null, 2) }</pre></div>
        </div>
    );
}

export default Content;