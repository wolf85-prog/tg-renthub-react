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
       <div>
            <img className="image_comp" src={image} alt=""/>
            <p style={{marginTop: '-10px', marginLeft: '1px'}}><span className="col_span" >{props.worker.count}/{props.worker.count}</span></p>
       </div>            
    );
};

export default ProjectWorkItem;

