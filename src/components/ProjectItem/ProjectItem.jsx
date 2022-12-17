import React from 'react';
import './ProjectItem.css';
import comp1 from "../../img/component_1.png";
import comp2 from "../../img/component_2.png";
import comp3 from "../../img/component_3.png";
import ProjectWorkList from '../ProjectWorkList/ProjectWorkList';

const ProjectItem = (props) => {
   
    const statusColor = props.post.status_id == null ? 'gray' : props.post.status_id.color;
    const dateProject = props.post.time != null ? props.post.time.start : '';

    const months = {
        0: 'января',
        1: 'февраля',
        2: 'марта',
        3: 'апреля',
        4: 'мая',
        5: 'июня',
        6: 'июля',
        7: 'августа',
        8: 'сентября',
        9: 'октября',
        10: 'ноября',
        11: 'декабря',
      }
    let count = 0;

    const d = new Date(dateProject);

    const d2 = dateProject != '' ? dateProject.split('T')[1] : '';

    const year = d.getFullYear()
    const date = d.getDate()
    const chas = String(d.getHours()).padStart(2, "0"); //d.getHours();
    const minut = String(d.getMinutes()).padStart(2, "0"); //d.getMinutes();
    const monthName = months[d.getMonth()];
        
    const formatted = (d2) ? `${date} ${monthName} ${year} ${chas}:${minut}` : `${date} ${monthName} ${year}`;

    Object.values(props.post.workers).map((worker) =>
        worker.fio ? count++ : count
    )

    return (
        <div className={`box ${statusColor}`}>
            <div className="post__content">
                <div className="post_title">{props.post.title}</div>
                <div className="subscribe">
                    {formatted}
                </div>

                <ProjectWorkList workers={props.post.workers} defould={count}/>

                {
                    (props.post.workers.length && count !=0)
                    ? <p><span className="find_span">Найдено {count} из {props.post.workers.length}</span></p> 
                    : <p><span className="nofind_span"></span></p>
                }
                

            </div>
        </div>
    );
};

export default ProjectItem;