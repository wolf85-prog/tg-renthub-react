import React from 'react';
import Sound from "../../img/name/1_sound2.svg";
import Riggers from "../../img/name/2_riggers2.svg";
import Production from "../../img/name/3_production2.svg";
import StageGround from "../../img/name/4_stage_ground2.svg";
import Video from "../../img/name/5_video2.svg";
import Light from "../../img/name/6_light2.svg";
import Stagehands from "../../img/name/7_stagehands2.svg";
import Tracks from "../../img/name/8_trucks2.svg";
import {FormControl, InputBase, InputLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {alpha, styled} from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: '21px',//theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 10,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        border: '2px solid #ECFF76',
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
        marginTop: '21px',//theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 10,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        border: '2px solid #ECFF76',
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

    if (props.equipment.icon === 'Sound') {
        image = Sound;
    } else if (props.equipment.icon === 'Riggers') {
        image = Riggers;
    } else if (props.equipment.icon === 'Production') {
        image = Production;
    } else if (props.equipment.icon === 'StageGround') {
        image = StageGround;
    } else if (props.equipment.icon === 'Video') {
        image = Video;
    } else if (props.equipment.icon === 'Light') {
        image = Light;
    } else if (props.equipment.icon === 'Stagehands') {
        image = Stagehands;
    } else if (props.equipment.icon === 'Tracks') {
        image = Tracks;
    }

    return (
        <div className="list_spec">
            <img style={{marginTop: "21px"}} src={image} alt='icon'/>

            <FormControl sx={{marginLeft: '7px', marginBottom: '20px', width: '60%'}} style={{border: '2px, solid, #ECFF76'}} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input" style={{color: '#ECFF76'}}>
                    {props.equipment.cat}
                </InputLabel>
                <BootstrapInput
                    id="bootstrap-input"
                    value={props.equipment.subname}
                />
            </FormControl>

            <FormControl sx={{marginLeft: '5px', width: '45px'}} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input2" />
                <BootstrapInput2
                    className="inputSpec"
                    id="bootstrap-input2"
                    value={props.equipment.count}
                />
            </FormControl>

            <DeleteIcon
                style={{marginBottom: "10px", marginLeft: "0", color: "#ECFF76"}}
                onClick={() => props.remove(props.equipment)}
            />
        </div>
    );
};

export default WorkerItem;