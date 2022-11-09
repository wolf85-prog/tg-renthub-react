import React, {useEffect, useState} from "react";
import ProjectList from "../components/ProjectList/ProjectList";
import MyButton from "../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";
import Header from "../components/Header/Header";

function Posts({posts}) {

    return (
        <div className="App">

            <Header header={{title: 'Проекты', icon: 'true'}}/>

            {posts.length !== 0
                ? <ProjectList posts={posts} title=""/>
                : <div>Проекты не найдены!</div>
            }

            <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>

        </div>
    );
}

export default Posts;
