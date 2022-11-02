import React, {useState} from 'react';
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/MyButton/MyButton";
import Header from "./Header/Header";

const ProjectForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewProject = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (

        <form>
            {/*Управляемы компонент*/}
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Название проекта"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Название города"
            />
            <MyButton onClick={addNewProject}>Создать проект</MyButton>
        </form>
    );
};

export default ProjectForm;