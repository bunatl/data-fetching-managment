import React, { useContext } from 'react';
import { SelectContext } from './App';

export const Selector = () => {
    const { setSelectValue } = useContext(SelectContext);

    return (
        <div className='selector'>
            <select onChange={ e => setSelectValue(e.target.value) }>
                <option>Whole DB</option>
                <option>Company name only</option>
                <option>Company + departments</option>
                <option>Departments only</option>
                <option>Employees only</option>
            </select>
        </div>
    );
};
