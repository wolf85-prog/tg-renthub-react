import React from 'react';
import classes from './ButtonStatus.module.css';

const ButtonStatus = ({children, ...props}) => {
    return (

        <button className={classes.myBtn} {...props}>
            {children}
        </button>
    );
};

export default ButtonStatus;