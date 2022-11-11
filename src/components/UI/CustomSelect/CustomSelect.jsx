import React from 'react';
import classes from './CustomSelect.module.css';



const CustomSelect = ({id, options, title,  value, onChange}) => {

    return (
        <div>
            {/*<select className="custom-select" id={id} onChange={onChange}>*/}
            {/*    { options.map((option, index) =>*/}
            {/*        <option key={id + index} value={option.id}>*/}
            {/*            {option.name}*/}
            {/*        </option>*/}
            {/*    )}*/}
            {/*</select>*/}

            <label htmlFor={id}>
                <select className={classes.mySelect} id={id} onChange={onChange}>
                    <option value="" disabled selected>{title}</option>
                    { options.map((option, index) =>
                            <option key={id + index} value={option.id}>
                                {option.name}
                            </option>
                        )}
                </select>

            </label>

        </div>
    );
};

export default CustomSelect;