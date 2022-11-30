import React, {useMemo, useState} from 'react';
import './ProjectFilter.css';
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";

const ProjectFilter = ({filter, setFilter}) => {

    const [status, setStatus] = useState(['onAir', 'Accept', 'Ready', 'Done', 'Load', 'Decline', 'New', 'Wasted', 'Test', 'All']);

    const onChangeFilter = (e) => {
        e.preventDefault();
        
        setFilter({...filter, query: e.target.value})
    } 

    return (
        <div>
            <div className='buttons_status'>
                <ButtonStatus className={'btn-status gray-btn'} onClick={onChangeFilter} value={status[9]}>{status[9]}</ButtonStatus>
                <ButtonStatus className={'btn-status green-btn'} onClick={onChangeFilter} value={status[0]}>{status[0]}</ButtonStatus>
                <ButtonStatus className={'btn-status purple-btn'} onClick={onChangeFilter} value={status[1]}>{status[1]}</ButtonStatus>
                <ButtonStatus className={'btn-status blue-btn'} onClick={onChangeFilter} value={status[2]}>{status[2]}</ButtonStatus>
                <ButtonStatus className={'btn-status yellow-btn'} onClick={onChangeFilter} value={status[3]}>{status[3]}</ButtonStatus>
                <ButtonStatus className={'btn-status orange-btn'} onClick={onChangeFilter} value={status[4]}>{status[4]}</ButtonStatus>
                <ButtonStatus className={'btn-status red-btn'} onClick={onChangeFilter} value={status[5]}>{status[5]}</ButtonStatus>
                <ButtonStatus className={'btn-status blue-btn'} onClick={onChangeFilter} value={status[6]}>{status[6]}</ButtonStatus>
                <ButtonStatus className={'btn-status red-btn'} onClick={onChangeFilter} value={status[7]}>{status[7]}</ButtonStatus>
                <ButtonStatus className={'btn-status gray-btn'} onClick={onChangeFilter} value={status[8]}>{status[8]}</ButtonStatus>
            </div>
        </div>
    );
};

export default ProjectFilter;