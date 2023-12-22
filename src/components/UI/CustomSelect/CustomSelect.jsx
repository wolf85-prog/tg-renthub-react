import React from 'react';
import classes from './CustomSelect.module.css';
import {BsChevronDown} from "react-icons/bs";



const CustomSelect = ({id, options, title, onChange, selectedElement, disabled, style}) => {

    return (
        <div>
            <label htmlFor={id}>
                <select 
                    disabled={disabled} 
                    className={classes.mySelect} 
                    id={id} 
                    value={selectedElement} 
                    onChange={onChange}
                    style={style}
                >
                    <option disabled value="">{title}</option>
                    { options.map((option, index) =>
                            <option key={id + index} value={option.id} >
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