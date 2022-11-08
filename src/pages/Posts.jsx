import React, {useEffect, useState} from "react";
import ProjectForm from "../components/PostForm/ProjectForm";
import ProjectList from "../components/ProjectList/ProjectList";
import MyButton from "../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";
import Header from "../components/Header/Header";

function Posts() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'Description'},
        {id: 2, title: 'JavaScript 2', body: 'Description'},
        {id: 3, title: 'JavaScript 3', body: 'Description'},
    ])

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">

            <Header header={{title: 'Проекты'}}/>

            {posts.length !== 0
                ? <ProjectList remove={removePost} posts={posts} title=""/>
                : <div>Проекты не найдены!</div>
            }

            <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>

        </div>
    );
}

export default Posts;
