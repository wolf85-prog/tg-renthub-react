import React, {useEffect, useState} from "react";
import {useProjects} from "../hooks/useProjects"
import ProjectList from "../components/ProjectList/ProjectList";
import ProjectFilter from "../components/ProjectFilter/ProjectFilter";
import MyButton from "../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";
import Header from "../components/Header/Header";
import Loader from "../components/UI/Loader/Loader";

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

            {/* {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            } */}

            <ProjectList posts={sortedAndSearchedPosts} title=""/>

            <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>

        </div>
    );
}

export default Posts;
