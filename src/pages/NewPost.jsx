import React, {useState} from 'react';
import ProjectForm from "../components/PostForm/ProjectForm";
import Header from "../components/Header/Header";

const NewPost = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'Description'},
        {id: 2, title: 'JavaScript 2', body: 'Description'},
        {id: 3, title: 'JavaScript 3', body: 'Description'},
    ])

    const createProject = (newPost) => {
        setPosts([...posts, newPost])
    }


    return (
        <div className="App">

            <Header header={{title: 'Новый проект'}}/>

            <ProjectForm create={createProject} />
        </div>
    );
};

export default NewPost;