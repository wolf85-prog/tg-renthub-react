import React from "react";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import briefcase from "./img/briefcase.svg";
import CloseButton from "../../img/x.png";


const Header = (props) => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>

            {props.header.icon !== 'false'
            ? <img src = {briefcase} alt="briefcase"/> : ""
            }


            <span className={'title'}>
                {props.header.title}
            </span>

            <span className={'username'}>
                {/* {user?.id} */}
                {queryId}
            </span>
            <img className={'btn-close'} onClick={onClose} src={CloseButton}/>
        </div>
    );
};

export default Header;