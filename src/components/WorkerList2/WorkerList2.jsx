import React, {useEffect} from 'react';

const WorkerList2 = ({workers}) => {


    return (
        <div style={{marginLeft: '25px', overflow: 'hidden'}}>
           <ul style={{textAlign: 'left', marginBottom: '15px'}}> 
            {workers.slice(0).reverse().map((worker, index) =>               
                <li style={{height: '25px', display: 'flex'}}><p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p>{worker.spec}</li>             
            )}
            </ul> 
        </div>
    );
};

export default WorkerList2;