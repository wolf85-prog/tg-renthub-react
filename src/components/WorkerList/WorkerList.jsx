import React from 'react';
import WorkerItem from "../WorkerItem/WorkerItem";

const WorkerList = ({workers, remove, change}) => {
    return (
        <div>
            {workers.map((worker) =>
                <WorkerItem remove={remove} worker={worker} key={worker.id} change={change}/>
            )}
        </div>
    );
};

export default WorkerList;