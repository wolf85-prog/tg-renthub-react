import React from 'react';
import './ProjectWorkItem.css';
import Sound from "../../img/spec/1_sound.svg";
import Riggers from "../../img/spec/2_riggers.svg";
import Production from "../../img/spec/3_production.svg";
import StageGround from "../../img/spec/4_stage_ground.svg";
import Video from "../../img/spec/5_video.svg";
import Light from "../../img/spec/6_light.svg";
import Stagehands from "../../img/spec/7_stagehands.svg";
import Tracks from "../../img/spec/8_tracks.svg";

const ProjectWorkItem = (props) => {

    let image;

    if (props.icon === 'Sound') {
        image = Sound;
    } else if (props.icon === 'Riggers') {
        image = Riggers;
    } else if (props.icon === 'Production') {
        image = Production;
    } else if (props.icon === 'StageGround') {
        image = StageGround;
    } else if (props.icon === 'Video') {
        image = Video;
    } else if (props.icon === 'Light') {
        image = Light;
    } else if (props.icon === 'Stagehands') {
        image = Stagehands;
    } else if (props.icon === 'Tracks') {
        image = Tracks;
    }

    return (
        <div>
            <img className="image_comp" src={image} alt=""/>
        </div>
    );
};

export default ProjectWorkItem;

