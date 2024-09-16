import React from 'react';
import './ProjectItem.css';
import ProjectWorkList from '../ProjectWorkList/ProjectWorkList';

const ProjectItem = (props) => {
    //const status = JSON.parse(props.post.status)
    // const statusColor = status === null ? 'gray' : status.color;
    const dateProject = props.post.datestart != null ? props.post.datestart : '';
    // dateProject2 = props.post.dateEnd != null ? props.post.dateEnd : '';
    const dateProject2 = props.post.datestart != null ? props.post.datestart : '';
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
    const d_end = new Date(dateProject2);

    const d2 = dateProject != '' ? dateProject.split('T')[1] : '';

    //time start
    const year = d.getFullYear()
    const date = d.getDate()
    const chas = String(d.getHours()).padStart(2, "0"); //d.getHours();
    const minut = String(d.getMinutes()).padStart(2, "0"); //d.getMinutes();
    const monthName = months[d.getMonth()];      
    const formatted = (d2) ? `${date} ${monthName} ${year} ${chas}:${minut}` : `${date} ${monthName} ${year}`;
    const formattedyear = (d2) ? `${date} ${monthName} ${year} ${chas}:${minut}` : `${date} ${monthName} ${year}`;

    //time end
    const year2 = d_end.getFullYear()
    const date2 = d_end.getDate()
    const chas2 = String(d_end.getHours()).padStart(2, "0"); //d.getHours();
    const minut2 = String(d_end.getMinutes()).padStart(2, "0"); //d.getMinutes();
    const monthName2 = months[d_end.getMonth()];       
    const formatted2 = `${date2} ${monthName2} ${year}`;


    props.post.spec && Object.values(JSON.parse(props.post.spec)).map((worker) =>
        worker.id ? count++ : count
    )

    props.post.spec && Object.values(JSON.parse(props.post.spec)).map((worker2) =>
        worker2.spec ? count2++ : count2
    )

    return (
        <div className='box'>
            <div className="post__content">
                <div className="post_title">{props.post.name}</div>
                <div className="subscribe">
                    {formatted}
                </div>

                <ProjectWorkList workers={JSON.parse(props.post.spec)} defould={count}/>

                {
                    (props.post.spec && count !=0)
                    ? <p className='find-post'><span className="find_span">Найдено {count} из {JSON.parse(props.post.spec).length - (JSON.parse(props.post.spec).length - count2)}</span></p> 
                    : <p><span className="nofind_span"></span></p>
                }
                

            </div>
        </div>
    );
};

export default ProjectItem;