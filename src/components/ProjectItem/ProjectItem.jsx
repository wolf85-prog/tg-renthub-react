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
    let count = 0;

    const d = new Date(dateProject);

    //const d2 = '';
    const d2 = dateProject != '' ? dateProject.split('T')[1] : '';

    const year = d.getFullYear()
    const date = d.getDate()
    const chas = d.getHours();
    const minut = d.getMinutes();
    const monthName = months[d.getMonth()];
        
    const formatted = (d2) ? `${date} ${monthName} ${year} ${chas}:${minut}` : `${date} ${monthName} ${year}`;

    //console.log('workers: ', props.post.workers)

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

                <ProjectWorkList workers={props.post.workers} />

                {
                    (props.post.workers.length) 
                    ? <p><span className="find_span">Найдено {count} из {props.post.workers.length}</span></p> 
                    : <p><span className="nofind_span"></span></p>
                }
                

            </div>
        </div>
    );
};

export default ProjectItem;