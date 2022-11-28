import React from 'react';
import './ProjectItem.css';
import comp1 from "../../img/component_1.png";
import comp2 from "../../img/component_2.png";
import comp3 from "../../img/component_3.png";

const ProjectItem = (props) => {

    //console.log(props.post);
    const statusColor = props.post.status != null ? props.post.status_id.color : 'gray' 

    return (
        <div className="{`box ${statusColor}`}">
            <div className="post__content">
                <div className="post_title">{props.post.title}</div>
                <div className="subscribe">
                    {props.post.time != null ? props.post.time.start : 'Не указано'}
                </div>
                <img className="image_comp" src={comp1} alt="component 1"/>
                <img className="image_comp" src={comp2} alt="component 2"/>
                <img className="image_comp" src={comp3} alt="component 3"/>
                <p><span className="col_span">2/2</span><span className="col_span">2/2</span><span className="col_span">2/2</span></p>
                <p><span className="find_span">Найдено 2 из 3</span></p>
            </div>
        </div>
    );
};

export default ProjectItem;