import React, {useMemo, useState} from 'react';
import './ProjectFilter.css';
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";
import CustomSelect from "../UI/CustomSelect/CustomSelect";

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
    
    //filter.query
    const onChangeFilter = (e) => {
        e.preventDefault();
        
        setFilter({...filter, query: e.target.value})
    } 

    //filter.sort
    // const onSortSelectChange = (e) => {
    //     setSelectedElement(e.target.options.value);
    //     const sortId = parseInt(e.target.options[e.target.selectedIndex].value);
    //     setFilter({...filter, sort: sortId})
    //     console.log("sort: ", sortId)
    // }

    return (
        <div>
            <div className='buttons_status'>

                {arr_status.map((item, index) =>
                    <ButtonStatus className={`btn-status ${item.color}-btn`} onClick={onChangeFilter} key={index+1} value={item.title}>{item.title}</ButtonStatus>     
                )}
            </div>

            <div style={{marginBottom: '15px'}}>
                <CustomSelect 
                    disabled={false}
                    id="sort"
                    title="Сортировка"
                    options={[
                        {id: 1, name: 'По дате создания'},
                        {id: 2, name: 'По дате начала'},
                    ]}
                    selectedElement={filter.sort}
                    setSelectedElement={setFilter}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                /> 
            </div>
        </div>
    );
};

export default ProjectFilter;