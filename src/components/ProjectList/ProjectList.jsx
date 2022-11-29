import React, {useMemo, useState} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";


const ProjectList = ({posts, title, remove}) => {

    const [status, setStatus] = useState(['onAir', 'Accept', 'Ready', 'Done', 'Load', 'Decline', 'New', 'Wasted', 'Test']);
    const [filtredPost, setFiltredPost] = useState(null);
    const [typeStatus, setTypeStatus] = useState('');

    const onChangeFilter = (e) => {
        e.preventDefault();

        console.log(e.target.value)

        //let typeStatus = e.target.value;
        setTypeStatus(e.target.value);
        
        //typeStatus !== "all" ? setFiltredPost(filterPost(typeStatus)) : setFiltredPost(getPost());
    }



    // function getPost() {
    //     const postList = posts;
    //     return postList;
    // }
      
    // function filterPost(statusType) {
    //     //post.status_id != null
    //     let filtredPost = getPost().filter(post => post.status_id.name === statusType);
    //     return filtredPost;
    // }

    const sortedPosts = useMemo( () => {
        return posts;
    }, [posts])

    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title === typeStatus)
    }, [typeStatus, posts])

    return (
        <div>
            <h1>
                {title}
            </h1>
            <p className="status_el">cтатус</p>
            <div className='buttons_status'>
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

            {posts.map((post, index) =>
                <ProjectItem remove={remove} number={index+1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default ProjectList;