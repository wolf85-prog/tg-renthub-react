import React, {useMemo, useState} from 'react';
import './ProjectWorkList.css';
import ProjectWorkItem from "../ProjectWorkItem/ProjectWorkItem";


const ProjectWorkList = ({workers}) => {

    //console.log('workers: ', workers)
    //console.log(Object.keys(workers));

    const newWorkers = Object.values(workers).map((value, index) => {
        //console.log('worker', value)  
        //value.title     
    });

    console.log('new workers: ', newWorkers)

    return (
        <div style={{display: 'flex'}}>

            {/* {users !='' ? users.map((worker, index) =>
                <ProjectWorkItem worker={worker} key={worker.id}/>        
            ) : 'Список специалистов пуст'}   */}

            {Object.values(workers).map((worker, index) => //{
                    //if (worker.title == 'Video') {
                        <ProjectWorkItem worker={worker} key={index+1}/> 
                    //} 
                //}      
            )} 
            
            
        </div>
    );
};

export default ProjectWorkList;