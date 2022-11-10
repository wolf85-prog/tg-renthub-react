import React from 'react';
import {MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";

const CustomSelect = ({options, defaultValue, id, value, onChange}) => {
    return (
        <div>

            <TextField
                style={{width: '250px', backgroundColor: '#2A2731'}}
                id="outlined-select-currency"
                select
                label="Категории"
                onChange={event => onChange(event.target.value)}>
                        {options.map((option, index) => (
                            <MenuItem key={id + index} value={option.id}>
                                {option.name}
                            </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default CustomSelect;