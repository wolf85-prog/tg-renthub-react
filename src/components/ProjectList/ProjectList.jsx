import React, {useMemo, useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";


const ProjectList = ({posts, title, worklist, remove}) => {
    
    if (!posts.length) {
        return (
            <h2 style={{textAlign: 'center'}}>
                Проекты не найдены!
            </h2>
        )
    } else {
        console.log(posts.length)
    }

    return (
        <div className="list-item">
            <h1>
                {title}
            </h1>
                     

            {posts.map((post, index) =>
                <ProjectItem remove={remove} number={index + 1} post={post} key={post.id} worklist={worklist}/> 
                //console.log('worklist item: ' + worklist)      
            )}
            
        </div>
    );
};

export default ProjectList;