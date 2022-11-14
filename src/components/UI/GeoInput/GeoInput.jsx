import React from 'react';
import {alpha, styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {IconButton, InputAdornment} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";

const RedditTextField = styled((props) => (
    <TextField InputProps={{disableUnderline: true,}} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #76A9FF',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const GeoInput = ({add, value}) => {

    const componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            //console.log("Latitude is :", position.coords.latitude);
            //console.log("Longitude is :", position.coords.longitude);

            const newGeo = position.coords.latitude + ', ' + position.coords.longitude

            add(newGeo)
        });
    }

    return (
        <div>
            <RedditTextField fullWidth
                             label="Укажите геолокацию"
                             id="project_geo"
                             variant="filled"
                             value={value}
                             InputProps={{
                                 endAdornment:
                                     <InputAdornment position="end">
                                         <IconButton onClick={componentDidMount}>
                                             <NearMeIcon />
                                         </IconButton>
                                     </InputAdornment>
                             }}
            />
        </div>
    );
};

export default GeoInput;