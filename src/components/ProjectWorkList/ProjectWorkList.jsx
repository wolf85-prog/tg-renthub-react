import React, {useMemo, useState, useEffect} from 'react';
import './ProjectWorkList.css';
import ProjectWorkItem from "../ProjectWorkItem/ProjectWorkItem";


const ProjectWorkList = ({workers}) => {

    const arrayWorker = []  
    const arrayWorker2 = []  
    const arr = []  
    const [workers2, setWorkers2] = useState([])
    const [count, setCount] = useState(1)

    //console.log('workers: ', workers)
    //console.log(Object.keys(workers));

    

    Object.values(workers).map((value, index) => {

        const newWorker = {
            id: index+1,
            title: value.title,
            count: count,
        }
        arrayWorker.push(value.title)      
           
    });

    const countItems = {}; // здесь будет храниться промежуточный результат

    for (const item of arrayWorker) {
        // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
        countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
    }


    const objectArray = Object.entries(countItems);
    objectArray.forEach(([key, value]) => {

        const obj = {
            title: key,
            count: value,
        }
        arr.push(obj) 
    });

    //console.log('arr: ', arr)

    // useEffect(() => {
    //     setWorkers2(arr)
    // },[]); 

    return (
        <div style={{display: 'flex'}}>

            {/* {users !='' ? users.map((worker, index) =>
                <ProjectWorkItem worker={worker} key={worker.id}/>        
            ) : 'Список специалистов пуст'}   */}

            {/* {Object.values(workers).map((worker, index) => 
                <ProjectWorkItem worker={worker} key={index+1}/>    
            )}  */}

            {arr.map((worker, index) => 
                <ProjectWorkItem worker={worker} key={index+1}/>    
            )} 
            
        </div>
    );
};

export default ProjectWorkList;