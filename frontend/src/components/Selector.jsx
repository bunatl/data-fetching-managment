import React, { useContext } from 'react';
import { SelectContext } from './App';

export const Selector = () => {
    const { selectValue, setSelectValue } = useContext(SelectContext);

    const selected = (text) => {
        if (selectValue !== text) return {};
        return {
            background: 'gray',
            border: '2px solid black'
        };
    };

    return (
        <div className='selector'>
            <div style={ selected('Whole DB') } onClick={ () => setSelectValue('Whole DB') }>Whole DB</div>
            <div style={ selected('Company name only') } onClick={ () => setSelectValue('Company name only') }>Company name only</div>
            <div style={ selected('Company + departments') } onClick={ () => setSelectValue('Company + departments') }>Company + departments</div>
            <div style={ selected('Departments only') } onClick={ () => setSelectValue('Departments only') }>Departments only</div>
            <div style={ selected('Employees only') } onClick={ () => setSelectValue('Employees only') }>Employees only</div>
        </div>
    );
};
