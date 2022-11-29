import React, {useEffect, useState} from "react";
import {useProjects} from "../hooks/useProjects"
import ProjectList from "../components/ProjectList/ProjectList";
import ProjectFilter from "../components/ProjectFilter/ProjectFilter";
import MyButton from "../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";
import Header from "../components/Header/Header";

function Posts({posts}) {

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(posts, filter.sort, filter.query);

    return (
        <div className="App">

            <Header header={{title: 'Проекты', icon: 'true'}}/>

            <p className="status_el">cтатус</p> 

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
            />

            <ProjectList posts={sortedAndSearchedPosts} title=""/>

            <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>

        </div>
    );
}

export default Posts;
