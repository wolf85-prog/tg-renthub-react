import React, {useState} from 'react';
import MyInput from "./UI/Input/MyInput";
import Button from "./UI/Button/Button";
import MyButton from "./UI/MyButton/MyButton";

const AddProject = () => {
    //console.log(props.post);

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addNewProject = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title,
            body
        }
        setPost([...posts, newPost])
    }

    return (
        <div className="AddProject">
            <form>
                {/*Управляемы компонент*/}
                <MyInput
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Название проекта"
                />
                <MyInput
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    type="text"
                    placeholder="Название города"
                />
                <MyButton onClick={addNewProject}>Создать проект</MyButton>
            </form>

        </div>
    );
};

export default AddProject;