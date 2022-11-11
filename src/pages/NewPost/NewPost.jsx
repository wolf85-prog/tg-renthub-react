import React, {useState, useEffect} from 'react';
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPost.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import {FormControl, InputAdornment, InputLabel, MenuItem, Stack} from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { alpha, styled } from '@mui/material/styles';
import Counter from "../../components/Counter/Counter";
import Header from "../../components/Header/Header";
import WorkerList from "../../components/WorkerList/WorkerList";
import {useNavigate} from "react-router-dom";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import {DesktopDateTimePicker} from "@mui/x-date-pickers";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import ButtonMinus from "../../img/minus.png";
import ButtonPlus from "../../img/plus.png";

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
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
            {
                id: 3,
                name: 'Backline',
            },
            {
                id: 4,
                name: 'Roadie',
            },
            {
                id: 5,
                name: 'Техник по звуку',
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
            {
                id: 3,
                name: 'Гафер',
            },
            {
                id: 4,
                name: 'Техник по свету',
            },
        ]
    },
    {
        id: 3,
        name: 'VIDEO',
        models: [
            {
                id: 1,
                name: 'Инженер VMix',
            },
            {
                id: 2,
                name: 'Инженер Resolume',
            },
            {
                id: 3,
                name: 'Инженер Zoom',
            },
            {
                id: 4,
                name: 'Оператор [сameraman]',
            },
            {
                id: 5,
                name: 'Гафер',
            },
            {
                id: 6,
                name: 'IT-специалист',
            },
            {
                id: 7,
                name: 'Техник монтажа',
            },
        ]
    },
    {
        id: 4,
        name: 'RIGGERS',
        models: [
            {
                id: 1,
                name: 'High Rigger [???]',
            },
            {
                id: 2,
                name: 'Lo Rigger [???]',
            },
        ]
    },
    {
        id: 5,
        name: 'STAGEHANDS',
        models: [
            {
                id: 1,
                name: 'Погрузка / разгрузка',
            },
            {
                id: 2,
                name: 'Монтаж / демонтаж',
            },
        ]
    },
    {
        id: 6,
        name: 'STAGE GROUND',
        models: [
            {
                id: 1,
                name: 'High Rigger [???]',
            },
            {
                id: 2,
                name: 'Lo Rigger [???]',
            },
        ]
    },
    {
        id: 7,
        name: 'TRUCKS',
        models: [
            {
                id: 1,
                name: 'C личным ТС [B]',
            },
            {
                id: 2,
                name: 'Без личного ТС [B]',
            },
            {
                id: 3,
                name: 'С гидролифтом',
            },
            {
                id: 4,
                name: 'Без гидролифта',
            },
            {
                id: 5,
                name: 'Грузоподъемность 4 т.',
            },
            {
                id: 6,
                name: 'Грузоподъемность 6 т.',
            },
            {
                id: 7,
                name: 'Грузоподъемность 7 т.',
            },
            {
                id: 8,
                name: 'Грузоподъемность 8 т.',
            },
            {
                id: 9,
                name: 'Грузоподъемность 10 т.',
            },
            {
                id: 10,
                name: 'Грузоподъемность 14 т.',
            },
        ]
    },
    {
        id: 8,
        name: 'PRODUCTION',
        models: [
            {
                id: 1,
                name: 'Мероприятие под ключ',
            },
            {
                id: 2,
                name: 'Отдельные технические задачи',
            },
        ]
    }
];



// компонент пользовательского выпадающего списка
const CustomSelect2 = ({ id, options, onChange, title }) => {
    return (

        <div>
            <TextField
                style={{width: '250px', backgroundColor: '#2A2731'}}
                id={id}
                select
                label={title}
                onChange={onChange}
            >
                {options.map((option, index) => (
                    <MenuItem key={id + index} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}


const NewPost = ({create}) => {

    const navigate = useNavigate();

    const [post, setPost] = useState({title: '', body: ''})
    const [categories, setCategories] = useState([]); // хранилище категорий
    const [models, setModels] = useState([]);         // хранилище моделей

    const [count, setCount] = useState(1)

    const [workers, setWorkers] = useState([
        {id: 1, cat:'Sound', spec: 'Звукорежессер', count: '1'},
        {id: 2, cat:'Sound', spec: 'Звукорежессер', count: '1'},
    ])
    const [worker, setWorker] = useState({cat: '', spec: '', count: ''})
    const [selectedSpec, setSelectedSpec] = useState('')

    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        setCount(count - 1)
    }

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

        console.log(worker)
        setWorker({cat: '', spec: '', count: ''})
    }

    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }

    const [value, setValue] = React.useState(dayjs('11.11.2022'));

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
        if (data.length > 0 && data) {
            setCategories(data);
        }

        // и модели из первой категории по умолчанию
        if (data.length > 0 && data[0].models && data[0].models.length > 0) {
            setModels(data[0].models);
        }

    }, []);

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);

        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories.find(item => item.id === categoryId);

        const catSelect = capitalizeFirst(category.name);

        setWorker({...worker, cat: catSelect})

        // выбираем все модели в категории, если таковые есть
        const models = category.models && category.models.length > 0
            ? category.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        // меняем модели во втором списке
        setModels(models);
    }

    const onSpecSelectChange = (e) => {
        const modelId = parseInt(e.target.options[e.target.selectedIndex].value);

        const model = models.find(item => item.id === modelId);

        setWorker({...worker, spec: model.name})
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
                        <Stack spacing={3}>
                            <DesktopDateTimePicker
                                    style={{backgroundColor: '#2A2731'}}
                                    label="Дата начала"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div>

                {/*Геолокация*/}
                <div className="text-field text-field_floating">
                    <FormControl fullWidth variant="outlined" style={{backgroundColor: '#2A2731'}}>
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
                                     style={{backgroundColor: '#2A2731'}}
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
                                fontSize: '14px',
                                color: '#76A9FF',
                            }}>Добавьте специалистов</p>

                        <div className="text-field text-field_floating">
                            <CustomSelect
                                id="category"
                                title="Категория"
                                options={categories}
                                onChange={onCategoriesSelectChange}
                            />
                        </div>

                        <div>
                            <CustomSelect
                                id="model"
                                title="Специальность"
                                options={models}
                                value={selectedSpec}
                                onChange={onSpecSelectChange}
                            />
                        </div>

                    </label>


                    <p style={{marginTop: "15px"}}>
                        Количество
                    </p>

                    <div>
                        <img style={{verticalAlign: 'middle', marginRight: '10px'}} src={ButtonMinus} onClick={decrement} alt='Минус'/>
                        <Counter
                            value={worker.count}
                            onChange={e => setWorker({...worker, count: e.target.value})}
                        />
                        <img style={{verticalAlign: 'middle', marginLeft: '10px'}} src={ButtonPlus} onClick={increment} alt='Плюс'/>
                    </div>

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
}

export default NewPost;