import React from "react";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import briefcase from "./img/briefcase.svg";
import CloseButton from "../../img/x.png";


const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <img src = {briefcase} alt="briefcase"/>
            <span className={'title'}>
                Проекты
            </span>
            {/*<Button className={'btn-close'} onClick={onClose}>Закрыть</Button>*/}
            <img className={'btn-close'} onClick={onClose} src={CloseButton}/>
        </div>
    );
};

export default Header;