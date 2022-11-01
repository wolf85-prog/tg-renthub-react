import React, {useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import AddProject from "../AddProject";


const ProjectList = ({posts, title}) => {

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {posts.map((post) =>
                <ProjectItem post={post} key={post.id}/>
            )}
        </div>
    );
};

export default ProjectList;