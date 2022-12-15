import React, {useMemo, useState} from 'react';
import './ProjectFilter.css';
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";

const ProjectFilter = ({filter, setFilter, arr_status}) => {

    console.log('arr_status: ', arr_status)

    arr_status.map((item, index) => {
                        if (item.title === 'OnAir') {
                            item.color = 'green';
                        } else if (item.title === 'Ready') {
                            item.color = 'blue';
                        } else if (item.title === 'Done') {
                            item.color = 'yellow';
                        } else if (item.title === 'Load') {
                            item.color = 'purple';
                        } else if (item.title === 'New') {
                            item.color = 'blue';
                        } else if (item.title === 'Wasted') {
                            item.color = 'red';
                        } else if (item.title === 'Test') {
                            item.color = 'gray';
                        } else if (item.title === 'All') {
                            item.color = 'gray';
                        } else {
                            item.color = '';
                        }
                    }
    )
    

    const onChangeFilter = (e) => {
        e.preventDefault();
        
        setFilter({...filter, query: e.target.value})
    } 

    return (
        <div>
            <div className='buttons_status'>

                {arr_status.map((item, index) =>
                    <ButtonStatus className={`btn-status ${item.color}-btn`} onClick={onChangeFilter} key={index+1} value={item.title}>{item.title}</ButtonStatus>     
                )}
            </div>
        </div>
    );
};

export default ProjectFilter;