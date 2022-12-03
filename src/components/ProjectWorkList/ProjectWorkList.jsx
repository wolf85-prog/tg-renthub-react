import React, {useMemo, useState} from 'react';
import './ProjectWorkList.css';
import ProjectWorkItem from "../ProjectWorkItem/ProjectWorkItem";


const ProjectWorkList = ({workers}) => {

    //console.log(workers)
    let users = workers ? JSON.parse(workers) : '';
    //console.log(users)

    return (
        <div style={{display: 'flex'}}>

            {users !='' ? users.map((worker, index) =>
                <ProjectWorkItem worker={worker} key={worker.id}/>        
            ) : 'Список специалистов пуст'}  

            {/* {users.map((worker, index) =>
                <ProjectWorkItem worker={worker} key={worker.id}/>        
            )}  */}
            
            
        </div>
    );
};

export default ProjectWorkList;