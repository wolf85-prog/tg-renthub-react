import React from 'react';
import Comp1 from "../../img/spec/comp1.svg";
import {FormControl, InputBase, InputLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {alpha, styled} from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const WorkerItem = () => {
    return (
        <div className="list_spec">
            <img style={{marginTop: "24px"}} src={Comp1} alt='Comp1'/>

            <FormControl sx={{marginLeft: '10px'}} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                    Sound
                </InputLabel>
                <BootstrapInput defaultValue="Звукорежессер" id="bootstrap-input" />
            </FormControl>

            <FormControl sx={{marginLeft: '5px', width: '35px' }} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input" />
                <BootstrapInput defaultValue="1" id="bootstrap-input" />
            </FormControl>

            <DeleteIcon style={{marginBottom: "10px", marginLeft: "10px"}} />
        </div>
    );
};

export default WorkerItem;