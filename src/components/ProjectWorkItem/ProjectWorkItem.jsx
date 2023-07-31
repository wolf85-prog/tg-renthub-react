import React from 'react';
import './ProjectWorkItem.css';
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

import specData from '../../data/specData';

const ProjectWorkItem = (props) => {

   // console.log("worker: ", props.worker)
   // console.log("defould: ", props.defould)

    let image;
    let icon;

    specData.map((specObject)=> {
        specObject.models.map((spec)=> {
            if (props.worker.title === spec.name) {
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

    

    return (
       <div>
            <img className="image_comp" src={image} alt=""/>
            
            {(props.defould === 0) ? <p style={{marginTop: '-10px', marginLeft: '1px'}}><span className="col_span">{props.worker.count_fio}/{props.worker.count}</span></p> 
            :
            (props.worker.title === 'undefined') 
                ? ''
                : <p style={{marginTop: '-10px', marginLeft: '1px'}}><span className={(props.worker.count_fio==props.worker.count) ? "col_span_found" : "col_span_not_found"} >{props.worker.count_fio}/{props.worker.count}</span></p>               
            }
            
       </div>            
    );
};

export default ProjectWorkItem;

