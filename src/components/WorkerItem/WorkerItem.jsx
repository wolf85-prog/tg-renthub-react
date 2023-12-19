import React, {useState} from 'react';
import Sound from "../../img/spec/1_sound.svg";
import Riggers from "../../img/spec/2_riggers.svg";
import Production from "../../img/spec/3_production.svg";
import StageGround from "../../img/spec/4_stage_ground.svg";
import Video from "../../img/spec/5_video.svg";
import Light from "../../img/spec/6_light.svg";
import Stagehands from "../../img/spec/7_stagehands.svg";
import Trucks from "../../img/spec/8_trucks.svg";
import Catering from "../../img/spec/9_catering.svg";
import Photo from "../../img/spec/10_photo.svg";
import Party from "../../img/spec/11_party.svg";

import {FormControl, InputBase, InputLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {alpha, styled} from "@mui/material/styles";

import specData from './../../data/specData';
import { useUsersContext } from "../../contexts/UserContext";

const WorkerItem = (props) => {
    let image;
    let icon;

    const { count, setCount, workers, setWorkers } = useUsersContext();
    //const [count, setCount] = useState(1)

    specData.map((specObject)=> {
        specObject.models.map((spec)=> {
            if (props.worker.spec === spec.name) {
                icon = specObject.icon;
            }    
        })
    })

    if (icon === 'Sound') {
        image = Sound;
    } else if (icon === 'Riggers') {
        image = Riggers;
    } else if (icon === 'Production') {
        image = Production;
    } else if (icon === 'Stage Ground') {
        image = StageGround;
    } else if (icon === 'Video') {
        image = Video;
    } else if (icon === 'Light') {
        image = Light;
    } else if (icon === 'Stagehands') {
        image = Stagehands;
    } else if (icon === 'Trucks') {
        image = Trucks;
    } else if (icon === 'Catering') {
        image = Catering;
    } else if (icon === 'Photo') {
        image = Photo;
    } else if (icon === 'Party') {
        image = Party;
    }

    const onChangeCount = (e) => {
        setCount(e.target.value)
        console.log(e.target.value)
        console.log("workers: ", workers)
        console.log("props: ", props)
        //setWorker({...worker, count: e.target.value})

        //props.change({...props.worker, count: e.target.value})
    }

    return (
        <div className="list_spec">
            <img style={{marginTop: "21px"}} src={image} alt='icon'/>

            <FormControl sx={{marginLeft: '7px', marginBottom: '20px', width: '60%'}} style={{border: '2px, solid, #76A9FF'}} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input" style={{color: '#76A9FF'}}>
                    {props.worker.cat}
                </InputLabel>
                <BootstrapInput
                    defaultValue=""
                    id="bootstrap-input"
                    value={props.worker.spec}
                />
            </FormControl>

            <FormControl sx={{marginLeft: '5px', width: '45px'}} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input2" />
                <BootstrapInput2
                    className="inputSpec"
                    defaultValue=""
                    id="bootstrap-input2"
                    value={count}
                    onChange={onChangeCount}
                />
            </FormControl>

            <DeleteIcon
                style={{marginBottom: "10px", marginLeft: "0", color: '#76A9FF'}}
                onClick={() => props.remove(props.worker)}
            />
        </div>
    );
};

export default WorkerItem;




const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: '21px',//theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 10,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        border: '2px solid #76A9FF',
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
        border: '2px solid #76A9FF',
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