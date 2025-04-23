import React, {useMemo, useState, useEffect} from 'react';
import './ReytingList.css';
import ReytingItem from "../ReytingItem/ReytingItem";

const ReytingList = ({posts}) => {
    

    
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
        console.log("Кол-во проектов: ", posts.length)
    }

    return (
        <div className="list-item grid-container">
    
            {posts.map((post, index) =>
                <ReytingItem number={index + 1} post={post} key={post.id}/>      
            )}
            
        </div>
    );
};

export default ReytingList;