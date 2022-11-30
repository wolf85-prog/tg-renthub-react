import React, {useMemo, useState} from 'react';
import './ProjectWorkList.css';
import ProjectWorkItem from "../ProjectWorkItem/ProjectWorkItem";


const ProjectWorkList = ({workers}) => {

    return (
        <div style={{display: 'flex'}}>
                     
            {workers.map((worker, index) =>
                <ProjectWorkItem worker={worker} key={worker.id}/>        
            )}
            
        </div>
    );
};

export default ProjectWorkList;