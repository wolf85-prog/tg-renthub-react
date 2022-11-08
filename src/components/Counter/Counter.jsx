import React, {useState} from 'react';
import {FormControl} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import ButtonPlus from "../../img/plus.png";
import ButtonMinus from "../../img/minus.png";
import './Counter.css';

const Counter = () => {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        setCount(count - 1)
    }


    return (
        <div className={'kol_group'}>
            <img src={ButtonMinus} onClick={decrement} alt='Минус'/>

            <FormControl sx={{ m: 1, width: '65px' , height: '43px'}} variant="outlined">
                <OutlinedInput
                    id="count_workers_input"
                    value={count}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
            </FormControl>

            <img src={ButtonPlus} onClick={increment} alt='Плюс'/>
        </div>
    );
};

export default Counter;