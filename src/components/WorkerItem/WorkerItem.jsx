import React from 'react';
import Sound1 from "../../img/spec/1_sound.svg";
import Riggers2 from "../../img/spec/2_riggers.svg";
import Production3 from "../../img/spec/3_production.svg";
import StageGround4 from "../../img/spec/4_stage_ground.svg";
import Video5 from "../../img/spec/5_video.svg";
import Light6 from "../../img/spec/6_light.svg";
import Stagehands7 from "../../img/spec/7_stagehands.svg";
import Tracks8 from "../../img/spec/8_tracks.svg";
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
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
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

const BootstrapInput2 = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        border: '1px solid #ced4da',
        fontSize: 16,
        textAlign: 'center',
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

const WorkerItem = (props) => {
    return (
        <div className="list_spec">
            <img style={{marginTop: "24px"}} src={Sound1} alt='Sound'/>

            <FormControl sx={{marginLeft: '10px'}} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input">
                    {props.worker.cat}
                </InputLabel>
                <BootstrapInput
                    defaultValue=""
                    id="bootstrap-input"
                    value={props.worker.spec}
                />
            </FormControl>

            <FormControl sx={{marginLeft: '5px', width: '45px' }} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input2" />
                <BootstrapInput2
                    className="inputSpec"
                    defaultValue=""
                    id="bootstrap-input2"
                    value={props.worker.count}
                />
            </FormControl>

            <DeleteIcon
                style={{marginBottom: "10px", marginLeft: "0"}}
                onClick={() => props.remove(props.worker)}
            />
        </div>
    );
};

export default WorkerItem;