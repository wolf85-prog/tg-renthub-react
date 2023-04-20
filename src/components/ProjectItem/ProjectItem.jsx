import React from 'react';
import './ProjectItem.css';
import ProjectWorkList from '../ProjectWorkList/ProjectWorkList';

const ProjectItem = (props) => {
   
    const statusColor = props.post.status_id == null ? 'gray' : props.post.status_id.color;
    const dateProject = props.post.time != null ? props.post.time.start : '';
    const dateProject2 = props.post.time != null ? props.post.time.end : '';

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
    let count2 = 0;

    const d = new Date(dateProject);
    
    let d_end =null
    if (dateProject2 != null) {
        d_end = new Date(dateProject2);
    }
    

    const d2 = dateProject != '' ? dateProject.split('T')[1] : '';

    //time start
    const year = d.getFullYear()
    const date = d.getDate()
    const chas = String(d.getHours()).padStart(2, "0"); //d.getHours();
    const minut = String(d.getMinutes()).padStart(2, "0"); //d.getMinutes();
    const monthName = months[d.getMonth()];      
    const formatted = (d2) ? `${date} ${monthName} ${chas}:${minut}` : `${date} ${monthName} `;
    const formattedyear = (d2) ? `${date} ${monthName} ${year} ${chas}:${minut}` : `${date} ${monthName} ${year}`;

    //time end
    const year2 = d_end.getFullYear()
    const date2 = d_end.getDate()
    const chas2 = String(d_end.getHours()).padStart(2, "0"); //d.getHours();
    const minut2 = String(d_end.getMinutes()).padStart(2, "0"); //d.getMinutes();
    const monthName2 = months[d_end.getMonth()];       
    const formatted2 = `${date2} ${monthName2} `;


    Object.values(props.post.workers).map((worker) =>
        worker.fio ? count++ : count
    )

    Object.values(props.post.workers).map((worker2) =>
        worker2.title ? count2++ : count2
    )

    return (
        <div className={`box ${statusColor}`}>
            <div className="post__content">
                <div className="post_title">{props.post.title}</div>
                <div className="subscribe">
                    {formatted2 ? formatted + ' - '+ formatted2 + year : formattedyear}
                </div>

                <ProjectWorkList workers={props.post.workers} defould={count}/>

                {
                    (props.post.workers.length && count !=0)
                    ? <p><span className="find_span">Найдено {count} из {props.post.workers.length - (props.post.workers.length - count2)}</span></p> 
                    : <p><span className="nofind_span"></span></p>
                }
                

            </div>
        </div>
    );
};

export default ProjectItem;