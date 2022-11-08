import React from 'react';
import WorkerItem from "../WorkerItem/WorkerItem";

const WorkerList = ({workers}) => {
    return (
        <div>
            {workers.map((worker) =>
                <WorkerItem worker={worker} key={worker.id} />
            )}
        </div>
    );
};

export default WorkerList;