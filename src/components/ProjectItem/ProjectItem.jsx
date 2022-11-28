import React from 'react';
import './ProjectItem.css';
import { format } from 'date-fns'
import comp1 from "../../img/component_1.png";
import comp2 from "../../img/component_2.png";
import comp3 from "../../img/component_3.png";

const ProjectItem = (props) => {

    console.log(props.post);
    
    const statusColor = props.post.status_id == null ? 'gray' : props.post.status_id.color;
    const dateProject = props.post.time != null ? props.post.time.start : 'Не указано';

    const months = {
        0: 'Январь',
        1: 'Февраль',
        2: 'Март',
        3: 'Апрель',
        4: 'Май',
        5: 'Июнь',
        6: 'Июль',
        7: 'Август',
        8: 'Сентябрь',
        9: 'Октябрь',
        10: 'Ноябрь',
        11: 'Декабрь',
      }

    // const monthName = months[dateProject.getMonth()];
    // const formatted = `${date} ${monthName} ${year}`;

    const d1 = new Date();

    return (
        <div className={`box ${statusColor}`}>
            <div className="post__content">
                <div className="post_title">{props.post.title}</div>
                <div className="subscribe">
                    {d1 !== null ? d1.getDate() : 'время'}
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