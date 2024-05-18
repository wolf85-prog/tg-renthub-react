import React, {useMemo, useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";


const ProjectList = ({posts, title, remove}) => {
    
    if (!posts.length) {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', zIndex: 10, position: 'relative'}}>
                <h2>Для создания первой заявки нажмите на кнопку внизу</h2>
            </div>       
        )
    } else {
        console.log("Кол-во проектов: ", posts.length)
    }

    return (
        <div className="list-item">
            <h1>
                {title}
            </h1>
                     

            {posts.map((post, index) =>
                <ProjectItem number={index + 1} post={post} key={post.id}/>      
            )}
            
        </div>
    );
};

export default ProjectList;