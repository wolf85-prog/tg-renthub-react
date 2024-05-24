import React, { useState } from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header2.css';

const Header2 = ({header}) => {


    return (
        <div className={'header'}>

            <span className={'title'}>
                {header.title}
            </span>

        </div>

    );
};

export default Header2;