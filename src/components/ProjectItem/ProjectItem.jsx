import React from 'react';
import './ProjectItem.css';

const ProjectItem = (props) => {

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
                <div className="post_btns">
                    <button>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;