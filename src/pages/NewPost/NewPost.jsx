import React, {useState, useEffect} from 'react';
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPost.css';
import Comp1 from "../../img/spec/comp1.svg"
import OutlinedInput from '@mui/material/OutlinedInput';
import {FormControl, Grid, IconButton, InputAdornment, InputBase, InputLabel, MenuItem, Select} from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { alpha, styled } from '@mui/material/styles';
import Counter from "../../components/Counter/Counter";
import Header from "../../components/Header/Header";
import WorkerList from "../../components/WorkerList/WorkerList";
import {useNavigate} from "react-router-dom";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import {DesktopDateTimePicker} from "@mui/x-date-pickers";

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


const data = [
    {
        id: 1,
        name: 'SOUND',
        models: [
            {
                id: 1,
                name: 'Звукорежиссер',
            },
            {
                id: 2,
                name: 'RF менеджер',
            },
        ]
    },
    {
        id: 2,
        name: 'LIGHT',
        models: [
            {
                id: 1,
                name: 'Художник по свету',
            },
            {
                id: 2,
                name: 'Оператор световой пушки',
            },
        ]
    }
];



// компонент пользовательского выпадающего списка
const CustomSelect2 = ({ id, options, onChange }) => {
    return (


        <select className="custom-select" id={id} onChange={onChange}>
                { options.map((option, index) =>
                    <option key={id + index} value={option.id}>
                        {option.name}
                    </option>
                )}
            </select>
    )
}



const NewPost = ({create}) => {

    const navigate = useNavigate();

    const [post, setPost] = useState({title: '', body: ''})
    const [categories, setCategories] = useState([]); // хранилище категорий
    const [models, setModels] = useState([]);         // хранилище моделей

    const [workers, setWorkers] = useState([
        {id: 1, title: 'Звукорежессер', count: '1'},
        {id: 2, title: 'Верхний риггер', count: '3'},
        {id: 3, title: 'Отдельные тех. задачи', count: '3'},
    ])
    const [worker, setWorker] = useState({title: '', count: ''})
    const [selectedSpec, setSelectedSpec] = useState('')

    const addNewProject = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})

        navigate("/");
    }

    const addNewWorker = (e) => {
        e.preventDefault();

        setWorkers([...workers, {...worker, id: Date.now()}])
        setWorker({title: 'Тех. рабочий', count: '1'})
    }

    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }

    const [value, setValue] = React.useState(dayjs(''));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }


    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        // устанавливаем категории
        setCategories(data);
        //setCategories([{id: 1, name: 'Легковые'}, {id: 2, name: 'Грузовые'}]);

        //console.log(categories);

        // и модели из первой категории по умолчанию
        setModels(data);

        console.log(models);

    }, []);

    // при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);

        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories.find(item => item.id === categoryId);

        //console.log(category.models);

        // выбираем все модели в категории, если таковые есть
        const models2 = category.models && category.models.length > 0
            ? category.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        console.log(models2);
        // меняем модели во втором списке
        setModels(models2);
    }

    const sortCategory = (spec) => {
        setSelectedSpec(spec)
        console.log(spec)
    }

    return (

        <div className="App">

            <Header header={{title: 'Новый проект', icon: 'false'}}/>

            <form>

                {/*Название*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Название проекта"
                                     defaultValue=""
                                     id="reddit-input"
                                     variant="filled"
                                     value={post.title}
                                     onChange={e => setPost({...post, title: e.target.value})}
                    />
                </div>

                {/*Дата начала*/}
                <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Дата начала"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />


                    </LocalizationProvider>
                </div>

                {/*Геолокация*/}
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
                            onClick={componentDidMount}
                        />

                    </FormControl>
                </div>

                {/*Техническое задание*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     id="outlined-multiline-flexible"
                                     label="Техническое задание"
                                     multiline
                                     rows={4}
                    />
                </div>

                <div>
                    <label>
                        <p
                            style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '14px'
                            }}>Добавьте специалистов</p>

                        <div className="text-field text-field_floating">
                            <CustomSelect
                                id="category"
                                options={categories}
                                onChange={onCategoriesSelectChange}
                            />
                        </div>

                        <div>
                            <CustomSelect
                                id="model"
                                options={models}
                                value={selectedSpec}
                                onChange={sortCategory}
                            />
                        </div>

                        {/*<div>*/}
                        {/*    <CustomSelect*/}
                        {/*        value={selectedSpec}*/}
                        {/*        onChange={sortCategory}*/}
                        {/*        defaultValue="Категории"*/}
                        {/*        options={[*/}
                        {/*            {id: 1, value: 'Title', name: 'Категория 1'},*/}
                        {/*            {id: 2, value: 'Body', name: 'Категория 2'}*/}
                        {/*        ]}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </label>


                    <p style={{marginTop: "15px"}}>
                        Количество
                    </p>

                    <Counter/>

                    <p>
                        <MyButton
                            style={{width: "103px", marginBottom: "15px"}}
                            onClick={addNewWorker}
                        >Добавить
                        </MyButton>
                    </p>

                </div>

                <WorkerList remove={removeWorker} workers={workers} />

                <MyButton onClick={addNewProject}>Создать проект</MyButton>
            </form>

        </div>
    );
};

export default NewPost;