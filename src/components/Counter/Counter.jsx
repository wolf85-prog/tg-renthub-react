import React, {useState} from 'react';
import classes from './Counter.module.css';

const Counter = (props) => {

    return (
        <input className={classes.myInput} {...props}/>
    );
};

export default Counter;