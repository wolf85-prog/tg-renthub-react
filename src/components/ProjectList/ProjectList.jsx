import React, {useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";


const ProjectList = ({posts, title, remove}) => {

    const [status, setStatus] = useState(['onAir', 'Accept', 'Ready', 'Done', 'Load', 'Decline', 'New', 'Wasted', 'Test'])
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
                <ButtonStatus className={'btn-status green-btn'} onClick={onChangeFilter} value={status[0]}>{status[0]}</ButtonStatus>
                <ButtonStatus className={'btn-status purple-btn'} onClick={onChangeFilter} value={status[1]}>{status[1]}</ButtonStatus>
                <ButtonStatus className={'btn-status blue-btn'} onClick={onChangeFilter} value={status[2]}>{status[2]}</ButtonStatus>
                <ButtonStatus className={'btn-status yellow-btn'} onClick={onChangeFilter} value={status[3]}>{status[3]}</ButtonStatus>
                <ButtonStatus className={'btn-status orange-btn'} onClick={onChangeFilter} value={status[3]}>{status[4]}</ButtonStatus>
                <ButtonStatus className={'btn-status red-btn'} onClick={onChangeFilter} value={status[3]}>{status[5]}</ButtonStatus>
                <ButtonStatus className={'btn-status blue-btn'} onClick={onChangeFilter} value={status[3]}>{status[6]}</ButtonStatus>
                <ButtonStatus className={'btn-status red-btn'} onClick={onChangeFilter} value={status[3]}>{status[7]}</ButtonStatus>
                <ButtonStatus className={'btn-status gray-btn'} onClick={onChangeFilter} value={status[3]}>{status[8]}</ButtonStatus>
            </div>

            {posts.map((post, index) =>
                <ProjectItem remove={remove} number={index+1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default ProjectList;