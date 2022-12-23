import React from 'react';
import classes from './SortSelect.module.css';
import {BsChevronDown} from "react-icons/bs";



const CustomSelect = ({id, options, defaultValue, onChange, value, disabled}) => {

    return (
        <div>
            <label htmlFor={id}>
                <select 
                    disabled={disabled} 
                    className={classes.mySelect} 
                    id={id} 
                    value={value} 
                    onChange={event => onChange(event.target.value)}
                >
                    <option disabled value="">{defaultValue}</option>
                    { options.map((option, index) =>
                            <option key={option.value} value={option.value} >
                                {option.name}
                            </option>
                        )}
                </select>
                <BsChevronDown className={'chevron'}/>
            </label>
        </div>
    );
};

export default CustomSelect;