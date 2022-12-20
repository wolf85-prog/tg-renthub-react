import React, {useMemo, useState, useEffect} from 'react';
import './ProjectWorkList.css';
import ProjectWorkItem from "../ProjectWorkItem/ProjectWorkItem";


const ProjectWorkList = ({workers, defould}) => {

    const arrayWorker = []  
    const arrayWorker2 = []  
    const arr = []  
    const arr2 = []  
    const [workers2, setWorkers2] = useState([])
    const [count, setCount] = useState(1)
    const arr_count = []  

    let count_fio = 0;

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

    arr.map((arritem) => {
        count_fio = 0; 
        Object.values(workers).map((value, index) => {     
            if (arritem.title === value.title) {
                if (value.fio) {
                    count_fio++
                    //console.log("title: " + value.title + " count: " + count_fio)                  
                }else {
                    count_fio;
                    //console.log("title: " + value.title + " count: " + count_fio)
                }               
            }
        })  
        const obj = {
            title2: arritem.title,
            count_fio: count_fio,
        }
        arr_count.push(obj)
    })

    //объединение 2-х массивов
    const worker3 = arr.map((item, index) =>
        ({
            ...item,
            ...arr_count[index],
        })
    );

    console.log("array3: ", worker3)

    return (
        <div style={{display: 'flex'}}>

            {worker3.length > 0 ? worker3.map((worker, index) => 
                    (worker.title != 'undefined') ? <ProjectWorkItem worker={worker} defould={defould} key={index+1}/> : ''                                   
            ) : 'Список специалистов пуст' } 
            
        </div>
    );
};

export default ProjectWorkList;