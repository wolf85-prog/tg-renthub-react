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

    const d = new Date(dateProject);

    const d2 = '';
    //const d2 = dateProject != '' ? dateProject.split('T')[1] : '';

    //console.log(d2);

    const year = d.getFullYear()
    const date = d.getDate()
    const chas = d.getHours();
    const minut = d.getMinutes();
    const monthName = months[d.getMonth()];
        
    const formatted = (d2) ? `${date} ${monthName} ${year} ${chas}:${minut}` : `${date} ${monthName} ${year}`;

    const workdata = [
        {
            id: 1,
            name: 'SOUND',
            icon: 'Sound',
            models: [
                {id: 1, name: 'Звукорежиссер',},
                {id: 2, name: 'RF менеджер',},
                {id: 3, name: 'Backline',},
                {id: 4, name: 'Roadie',},
                {id: 5, name: 'Техник по звуку',},
            ]
        },
        {
            id: 2,
            name: 'LIGHT',
            icon: 'Light',
            models: [
                {id: 1, name: 'Художник по свету',},
                {id: 2, name: 'Оператор световой пушки',},
                {id: 3, name: 'Гафер',},
                {id: 4, name: 'Техник по свету',},
            ]
        },
        {
            id: 3,
            name: 'VIDEO',
            icon: 'Video',
            models: [
                {id: 1, name: 'Инженер VMix',},
                {id: 2, name: 'Инженер Resolume',},
                {id: 3, name: 'Инженер Zoom',},
                {id: 4, name: 'Оператор [сameraman]',},
                {id: 5, name: 'Гафер',},
                {id: 6, name: 'IT-специалист',},
                {id: 7, name: 'Техник монтажа',},
            ]
        },
        {
            id: 4,
            name: 'RIGGERS',
            icon: 'Riggers',
            models: [
                {id: 1, name: 'High Rigger [???]',},
                {id: 2, name: 'Lo Rigger [???]',},
            ]
        },
        {
            id: 5,
            name: 'STAGEHANDS',
            icon: 'Stagehands',
            models: [
                {id: 1, name: 'Погрузка / разгрузка',},
                {id: 2, name: 'Монтаж / демонтаж',},
            ]
        },
        {
            id: 6,
            name: 'STAGE GROUND',
            icon: 'StageGround',
            models: [
                {id: 1, name: 'High Rigger [???]',},
                {id: 2, name: 'Lo Rigger [???]',},
            ]
        },
        {
            id: 7,
            name: 'TRUCKS',
            icon: 'Tracks',
            models: [
                {id: 1, name: 'C личным ТС [B]',},
                {id: 2, name: 'Без личного ТС [B]',},
                {id: 3, name: 'С гидролифтом',},
                {id: 4, name: 'Без гидролифта',},
                {id: 5, name: 'Грузоподъемность 4 т.',},
                {id: 6, name: 'Грузоподъемность 6 т.',},
                {id: 7, name: 'Грузоподъемность 7 т.',},
                {id: 8, name: 'Грузоподъемность 8 т.',},
                {id: 9, name: 'Грузоподъемность 10 т.',},
                {id: 10, name: 'Грузоподъемность 14 т.',},
            ]
        },
        {
            id: 8,
            name: 'PRODUCTION',
            icon: 'Production',
            models: [
                {id: 1, name: 'Мероприятие под ключ',},
                {id: 2, name: 'Отдельные технические задачи',},
            ]
        }
    ];

    

    return (
        <div className={`box ${statusColor}`}>
            <div className="post__content">
                <div className="post_title">{props.post.title}</div>
                <div className="subscribe">
                    {formatted}
                </div>

                <img className="image_comp" src={comp1} alt="component 1"/>
                <img className="image_comp" src={comp2} alt="component 2"/>
                <img className="image_comp" src={comp3} alt="component 3"/>
                

                <ProjectWorkList workers={props.post.workers} />

                {/* {props.post.workers.map((worker) =>
                    <ProjectWorkItem worker={worker} key={worker.id}/>        
                )} */}

                <p><span className="col_span">2/2</span><span className="col_span">2/2</span><span className="col_span">2/2</span></p>
                <p><span className="find_span">Найдено 2 из 3</span></p>
            </div>
        </div>
    );
};

export default ProjectItem;