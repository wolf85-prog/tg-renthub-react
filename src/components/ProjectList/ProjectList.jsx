import React, {useMemo, useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";


const ProjectList = ({posts, title, remove}) => {
    
    const [showInfoChat, setShowInfoChat] = useState(false)
    const [showInfoProj, setShowInfoProj] = useState(false)
    const [showMoreInfo, setShowMoreInfo] = useState(false)

    const clickShowInfoChat = () => {
        setShowInfoChat(true)
    }

    const clickShowInfoProj = () => {
        setShowInfoProj(true)
    }

    
    if (!posts.length) {
        return (
            // <h2 style={{textAlign: 'center', paddingTop: '80px', paddingBottom: '80px'}}>
            //     Проекты не найдены
            // </h2>
            <>
            <div className='container'>
                <div className='proj-card'>
                    <div className='rectangle-projcard'></div>
                    <div className='rectangle-projcard2'></div>
                    <div className='rectangle-projcard3'></div>

                    <div>
                        <div className='project-text'>
                            <p className="project_title">Здесь будут ваши проекты</p>
                            
                        </div>
                        <img className='vector' src={Vector} alt=''/>  
                    </div>

                    
                    <div className='card-footer'>
                        <div><p className='project_money2'>0.00</p></div>
                        <div className='chat-button'>Чат</div>
                    </div>
                </div>
            </div>

            </>
        )
    } else {
        //console.log("Кол-во проектов: ", posts.length)
    }

    return (
        <div className="list-item">
            <h1>
                {title}
            </h1>
                     

            {/* {posts.map((post, index) =>
                <ProjectItem number={index + 1} post={post} key={post.id + index} width={width} />    
            )} */}
            
        </div>
    );
};

export default ProjectList;