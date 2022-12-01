import React, {useEffect, useState} from "react";
import {useProjects} from "../../hooks/useProjects"
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import MyButton from "../../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/UI/Loader/Loader";
import './Post.css';

function Posts({posts, manager}) {

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(posts, manager, filter.sort, filter.query);


    return (
        <div className="App">

            <Header header={{title: 'Проекты', icon: 'true'}}/>

            <p className="status_el">cтатус</p> 

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
            />
            
            <ProjectList posts={sortedAndSearchedPosts} title=""/>
            
            <div className="footer">
                <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>
            </div>            

        </div>
    );
}

export default Posts;
