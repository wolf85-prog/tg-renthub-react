import React, {useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import AddProject from "../AddProject";
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";



const ProjectList = ({posts, title, remove}) => {

    return (
        <div>
            <h1>
                {title}
            </h1>
            <p className="status_el">cтатус</p>
            <div className='buttons_status'>
                <ButtonStatus className={'btn-done'}>В эфире</ButtonStatus>
                <ButtonStatus className={'btn-efir'}>Готов</ButtonStatus>
                <ButtonStatus className={'btn-obr'}>Обработ.</ButtonStatus>
                <ButtonStatus className={'btn-zaver'}>Заверш.</ButtonStatus>
            </div>

            {posts.map((post, index) =>
                <ProjectItem remove={remove} number={index+1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default ProjectList;