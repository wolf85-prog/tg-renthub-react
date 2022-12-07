import React, {useMemo, useState} from 'react';
import './ProjectWorkList.css';
import ProjectWorkItem from "../ProjectWorkItem/ProjectWorkItem";


const ProjectWorkList = ({workers}) => {

    console.log('workers: ', workers)
    //const users = JSON.parse(workers); //workers ? workers : 'пусто';
    console.log(Object.keys(workers));
    //console.log(users)

    return (
        <div style={{display: 'flex'}}>

            {/* {users !='' ? users.map((worker, index) =>
                <ProjectWorkItem worker={worker} key={worker.id}/>        
            ) : 'Список специалистов пуст'}   */}

            {Object.values(workers).map((worker, index) =>
                <ProjectWorkItem worker={worker} key={worker.id}/>        
            )} 
            
            
        </div>
    );
};

export default ProjectWorkList;