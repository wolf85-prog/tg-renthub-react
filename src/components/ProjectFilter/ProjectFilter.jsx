import React, {useMemo, useState} from 'react';
import './ProjectFilter.css';
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";

const ProjectFilter = ({filter, setFilter, arr_status}) => {

    console.log('arr_status: ', arr_status)

    // const [status, setStatus] = useState([
    //     {title: 'All', color: 'gray'}, 
    //     {title: 'onAir', color: 'green'}, 
    //    // {title: 'Accept', color: 'purple'}, 
    //     {title: 'Ready', color: 'blue'}, 
    //     {title: 'Done', color: 'yellow'}, 
    //     {title: 'Load', color: 'orange'}, 
    //    // {title: 'Decline', color: 'red'}, 
    //     {title: 'New', color: 'blue'}, 
    //     {title: 'Wasted', color: 'red'}, 
    //     {title: 'Test', color: 'gray'}, 
    // ]);

    arr_status.map((item, index) => {
                        if (item.title === 'onAir') {
                            item.color = 'green';
                        } else if (item.title === 'Ready') {
                            item.color = 'blue';
                        } else if (item.title === 'Done') {
                            item.color = 'yellow';
                        } else if (item.title === 'Load') {
                            item.color = 'orange';
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

                {arr_status.map((item, index) =>// {
                        // if (item.title === 'onAir') {
                        //     item.color = 'green';
                        // } else if (item.title === 'Ready') {
                        //     item.color = 'blue';
                        // } else if (item.title === 'Done') {
                        //     item.color = 'yellow';
                        // } else if (item.title === 'Load') {
                        //     item.color = 'orange';
                        // } else if (item.title === 'New') {
                        //     item.color = 'blue';
                        // } else if (item.title === 'Wasted') {
                        //     item.color = 'red';
                        // } else if (item.title === 'Test') {
                        //     item.color = 'gray';
                        // } else {
                        //     item.color = '';
                        // }
                        <ButtonStatus className={`btn-status ${item.color}-btn`} onClick={onChangeFilter} key={index+1} value={item.title}>{item.title}</ButtonStatus>  
                    //}    
                )}
            </div>
        </div>
    );
};

export default ProjectFilter;