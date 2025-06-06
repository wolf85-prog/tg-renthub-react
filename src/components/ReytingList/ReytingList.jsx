import React, {useMemo, useState, useEffect} from 'react';
import './ReytingList.css';
import ReytingItem from "../ReytingItem/ReytingItem";

const ReytingList = ({posts, projectname, projectId, projectCrmId}) => {
    

    
    if (!posts.length) {
        return (
            <>
            <div className='container'>
                <div className='proj-card'>
                    Специалисты не найдены
                </div>
            </div>

            </>
        )
    } else {
        console.log("Кол-во специалистов: ", posts.length)
    }

    return (
        <div className="list-item grid-container">
    
            {posts.map((post, index) =>
                <ReytingItem number={index + 1} post={post} key={post.id} project={projectname} projectId={projectId} projectCrmId={projectCrmId} />      
            )}
            
        </div>
    );
};

export default ReytingList;