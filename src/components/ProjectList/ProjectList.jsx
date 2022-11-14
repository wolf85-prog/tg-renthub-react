import React, {useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";


const ProjectList = ({posts, title, remove}) => {

    const [status, setStatus] = useState(['В эфире', 'Готов', 'Обработан', 'Завершен'])
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeFilter = (e) => {
        //e.preventDefault();
        console.log(e.target.value)
        //return status
    }

    return (
        <div>
            <h1>
                {title}
            </h1>
            <p className="status_el">cтатус</p>
            <div className='buttons_status'>
                <ButtonStatus className={'btn-done'} onClick={onChangeFilter} value={status[0]}>В эфире</ButtonStatus>
                <ButtonStatus className={'btn-efir'} onClick={onChangeFilter} value={status[1]}>Готов</ButtonStatus>
                <ButtonStatus className={'btn-obr'} onClick={onChangeFilter} value={status[2]}>Обработ.</ButtonStatus>
                <ButtonStatus className={'btn-zaver'} onClick={onChangeFilter} value={status[3]}>Заверш.</ButtonStatus>
            </div>

            {posts.map((post, index) =>
                <ProjectItem remove={remove} number={index+1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default ProjectList;