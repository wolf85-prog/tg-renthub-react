import React from 'react';
import './ProjectItem.css';
import MyButton from "../UI/MyButton/MyButton";

const ProjectItem = (props) => {

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;