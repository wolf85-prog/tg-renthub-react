import React from 'react';
import Sound from "../../img/spec/1_sound.svg";
import Riggers from "../../img/spec/2_riggers.svg";
import Production from "../../img/spec/3_production.svg";
import StageGround from "../../img/spec/4_stage_ground.svg";
import Video from "../../img/spec/5_video.svg";
import Light from "../../img/spec/6_light.svg";
import Stagehands from "../../img/spec/7_stagehands.svg";
import Tracks from "../../img/spec/8_tracks.svg";
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
    let image;

    if (props.worker.icon === 'Sound') {
        image = Sound;
    } else if (props.worker.icon === 'Riggers') {
        image = Riggers;
    } else if (props.worker.icon === 'Production') {
        image = Production;
    } else if (props.worker.icon === 'StageGround') {
        image = StageGround;
    } else if (props.worker.icon === 'Video') {
        image = Video;
    } else if (props.worker.icon === 'Light') {
        image = Light;
    } else if (props.worker.icon === 'Stagehands') {
        image = Stagehands;
    } else if (props.worker.icon === 'Tracks') {
        image = Tracks;
    }

    return (
        <div className="list_spec">
            <img style={{marginTop: "24px"}} src={image} alt='icon'/>

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