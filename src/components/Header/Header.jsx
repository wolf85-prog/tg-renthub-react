import React from 'react';
import Button from "../UI/Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <span className={'title'}>
                Проекты
            </span>
            <Button className={'btn-close'} onClick={onClose}>Закрыть</Button>
        </div>
    );
};

export default Header;