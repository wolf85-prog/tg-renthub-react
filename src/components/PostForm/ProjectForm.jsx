import React, {useState} from 'react';
import MyInput from "../UI/Input/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import './ProjectForm.css';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import {FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';


const categories = [
    {
        value: 'SOUND',
        label: 'SOUND',
    },
    {
        value: 'LIGHT',
        label: 'LIGHT',
    },
    {
        value: 'VIDEO',
        label: 'VIDEO',
    },
    {
        value: 'RIGGERS',
        label: 'RIGGERS',
    },
];


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

    const [category, setCategory] = React.useState('AUDIO');



    return (

        <form>
            {/*Управляемы компонент*/}
            {/*
            <div className="text-field text-field_floating">
                <input
                    value={post.title}
                    onChange={e => setPost({...post, title: e.target.value})}
                    className="text-field__input"
                    type="text"
                    id="title_post"
                    placeholder="Название проекта"
                />
                <label className="text-field__label" htmlFor="title_post">Название проекта</label>
            </div>

            <div className="text-field text-field_floating">
                <input
                    value={post.body}
                    onChange={e => setPost({...post, body: e.target.value})}
                    className="text-field__input"
                    type="text"
                    id="date"
                    placeholder="Дата начала"
                />
                <label className="text-field__label" htmlFor="date">Укажите геолокацию</label>
            </div>
            */}
            <div className="text-field text-field_floating">
                <TextField fullWidth
                           id="outlined-basic"
                    label="Название проекта"
                    variant="outlined" />
            </div>

            <div className="text-field text-field_floating">
                <TextField fullWidth
                    id="date"
                    label="Дата начала"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <div className="text-field text-field_floating">
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Укажите геолокацию</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end"><NearMeIcon /></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />

                </FormControl>
            </div>

            <div className="text-field text-field_floating">
                <TextField fullWidth
                    id="outlined-multiline-flexible"
                    label="Техническое задание"
                    multiline
                    rows={4}
                />
            </div>

            <div>
                <label>
                    <p>Добавьте специалистов</p>
                    <div className="text-field text-field_floating">
                        <TextField fullWidth
                            id="outlined-select-currency"
                            select
                            label="Категория"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField fullWidth
                            id="outlined-select-currency"
                            select
                            label="Специальность"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                </label>
                <p><MyButton>Добавить</MyButton></p>
            </div>

            <MyButton onClick={addNewProject}>Создать проект</MyButton>
        </form>
    );
};

export default ProjectForm;