import React, {useState, useEffect, useCallback} from 'react';
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewProject.css';
import {Stack} from "@mui/material";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { alpha, styled } from '@mui/material/styles';
import Counter from "../../components/Counter/Counter";
import Header from "../../components/Header/Header";
import WorkerList from "../../components/WorkerList/WorkerList";
import {useNavigate} from "react-router-dom";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import ButtonMinus from "../../img/minus.png";
import ButtonPlus from "../../img/plus.png";
import Calendar from "../../img/calendar.svg";
import GeoInput from "../../components/UI/GeoInput/GeoInput";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true  }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #76A9FF',
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
        icon: 'Sound',
        models: [
            {id: 1, name: 'Звукорежиссер',},
            {id: 2, name: 'RF менеджер',},
            {id: 3, name: 'Backline',},
            {id: 4, name: 'Roadie',},
            {id: 5, name: 'Техник по звуку',},
        ]
    },
    {
        id: 2,
        name: 'LIGHT',
        icon: 'Light',
        models: [
            {id: 1, name: 'Художник по свету',},
            {id: 2, name: 'Оператор световой пушки',},
            {id: 3, name: 'Гафер',},
            {id: 4, name: 'Техник по свету',},
        ]
    },
    {
        id: 3,
        name: 'VIDEO',
        icon: 'Video',
        models: [
            {id: 1, name: 'Инженер VMix',},
            {id: 2, name: 'Инженер Resolume',},
            {id: 3, name: 'Оператор Zoom',},
            {id: 4, name: 'Оператор [сameraman]',},
            {id: 5, name: 'Гафер',},
            {id: 6, name: 'IT-специалист',},
            {id: 7, name: 'Техник монтажа',},
        ]
    },
    {
        id: 4,
        name: 'RIGGERS',
        icon: 'Riggers',
        models: [
            {id: 1, name: 'High Rigger',},
            {id: 2, name: 'Lo Rigger',},
        ]
    },
    {
        id: 5,
        name: 'STAGEHANDS',
        icon: 'Stagehands',
        models: [
            {id: 1, name: 'Помощник / Грузчик',},
        ]
    },
    {
        id: 6,
        name: 'STAGE GROUND',
        icon: 'StageGround',
        models: [
            {id: 1, name: 'High Rigger',},
            {id: 2, name: 'Lo Rigger',},
        ]
    },
    {
        id: 7,
        name: 'TRUCKS',
        icon: 'Tracks',
        models: [
            {id: 1, name: 'C личным ТС [B]',},
            {id: 2, name: 'Без личного ТС [B]',},
            {id: 3, name: 'С гидролифтом',},
            {id: 4, name: 'Без гидролифта',},
            {id: 5, name: 'Грузоподъемность 4 т.',},
            {id: 6, name: 'Грузоподъемность 6 т.',},
            {id: 7, name: 'Грузоподъемность 7 т.',},
            {id: 8, name: 'Грузоподъемность 8 т.',},
            {id: 9, name: 'Грузоподъемность 10 т.',},
            {id: 10, name: 'Грузоподъемность 14 т.',},
        ]
    },
    {
        id: 8,
        name: 'PRODUCTION',
        icon: 'Production',
        models: [
            {id: 1, name: 'Мероприятие под ключ',},
            {id: 2, name: 'Отдельные технические задачи',},
        ]
    }
];


const NewProject = () => {

    const API_URL = 'https://proj.uley.team:8000/'
    const API_URL_MANAGER = API_URL + 'managers/';
    const API_URL_COMPANY = API_URL + 'manager/';

    //const navigate = useNavigate();

    const {tg, queryId, user} = useTelegram();

    const [modal, setModal] = useState(false)

    //проект
    const [post, setPost] = useState({title: '', time: '', geo: '', teh: '', status: ''})

    const [project, setProject] = useState('');
    const [datestart, setDatestart] = useState('2022-12-01 10:00:00');
    const [teh, setTeh] = useState('');

    //геолокация
    const [geo, setGeo] = useState('');

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    const [disabled, setDisabled] = useState(true)
    const [disabledBtn, setDisabledBtn] = useState(true)

    //количество работников
    const [count, setCount] = useState(1)
    //работник
    const [worker, setWorker] = useState({id: '', cat: '', spec: '', count: 1, icon: ''})
    //работники
    const [workers, setWorkers] = useState([])
    //select
    const [selectedElement, setSelectedElement] = useState("")

    const [managerId, setManagerId] = useState('')
    const [companyId, setCompanyId] = useState('')

    const getManagerId = (id) => {
        const url = API_URL_MANAGER + id;
        fetch(url)
            .then(response => { 
                return response.json()               
            })
            .then(data => {
                console.log('ManagerId: ', data) 
                setManagerId(data)            
            })
    }

    const getCompanyId = (id) => {
        const url = API_URL_COMPANY + id;
        fetch(url)
            .then(response => { 
                return response.json()               
            })
            .then(data => {
                console.log('CompanyId: ', data) 
                setCompanyId(data)            
            })
    }


    function increment() {
        setCount(count + 1)
        setWorker({...worker, count: count + 1})
    }

    function decrement() {
        if (count != 1 && count > 0) {
            setCount(count - 1)
            setWorker({...worker, count: count - 1})
        }     
    }


    {/* Добавление работника */}
    const addNewWorker = (e) => {
        e.preventDefault();

        if (worker.cat !== '' || worker.spec !== '') {
            setWorkers([...workers, {...worker, id: Date.now()}])
        }
        setWorker({cat: '', spec: '', count: 1, icon: ''})

        setCount(1);
        setSelectedElement("");

        setDisabled(true);
        setDisabledBtn(true);
    }

    {/* Удаление работника */}
    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }


    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        getManagerId(user?.id); //user?.id
        getCompanyId(user?.id); //user?.id

        // устанавливаем категории
        if (data.length > 0 && data) {
            setCategories(data);
        }

        // и модели из первой категории по умолчанию
        if (data.length > 0 && data[0].models && data[0].models.length > 0) {
            setModels(data[0].models);
        }

    }, []);

    //Название категории с большой буквы
    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    // при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        setSelectedElement(e.target.options.value);

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);

        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories.find(item => item.id === categoryId);

        const catSelect = capitalizeFirst(category.name);

        const iconCatSelect = category.icon;

        setWorker({...worker, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        const models = category.models && category.models.length > 0
            ? category.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        // меняем модели во втором списке
        setModels(models);

        setDisabled(false)
    }

    const onChangeProject = (e) => {
        setProject(e.target.value)
    }

    const onChangeTime = (e) => {
        setDatestart(e.target.value)
    }

    function addGeo (newGeo) {
        //setPost({...post, geo: newGeo})
        setGeo(newGeo)
    }

    const onChangeGeodata = (e) => {
        setGeo(e.target.value)
        console.log(e.target.value)
    }

    const onChangeTeh = (e) => {
        setTeh(e.target.value)
    }

    //выбор специальности
    const onSpecSelectChange = (e) => {
        setSelectedElement(e.target.options.value);

        const modelId = parseInt(e.target.options[e.target.selectedIndex].value);
        const model = models.find(item => item.id === modelId);

        setWorker({...worker, spec: model.name})

        setDisabledBtn(false)
    }


    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {
        const data = {
            projectname: project,
            datestart,
            geo,
            teh,
            worklist: workers,
            managerId,
            companyId,
            queryId,
        }
        if (project.includes("Тестпроект")) {
            fetch(API_URL + 'web-test-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        } else {
            fetch(API_URL + 'web-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        }
        
    }, [project, workers, datestart, geo, teh, managerId, companyId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Создать проект'
        })
    }, [])

    useEffect(() => {
        if(workers.length > 0) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }  
    }, [workers])

    let tex = 'Ведуться технические работы!'


    return (

        <div className="App">
            <Header header={{title: 'Новый проект', icon: 'false'}}/>
            <form>
                {/*Название*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Название проекта"
                                     id="project_name"
                                     variant="filled"
                        // value={post.title}
                        // onChange={e => setPost({...post, title: e.target.value})}
                                     value={project}
                                     onChange={onChangeProject}
                    />
                </div>

                {/*Дата начала*/}
                <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '4px'}}>
                            {/*<DesktopDateTimePicker*/}
                            {/*        label="Дата начала"*/}
                            {/*        value={value}*/}
                            {/*        onChange={handleChange}*/}
                            {/*        renderInput={(params) => <TextField {...params} />}*/}
                            {/*/>*/}
                            <RedditTextField
                                id="datetime-local"
                                label="Дата начала"
                                type="datetime-local"
                                variant="filled"
                                //defaultValue="2022-11-11T10:30"
                                // onChange={e => setPost({...post, time: e.target.value})}
                                value={datestart}
                                onChange={onChangeTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <span className="open-button">
                              <button type="button"><img src={Calendar} alt='calendar'/></button>
                            </span>
                        </Stack>
                    </LocalizationProvider>
                </div>

                {/*Геолокация*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Адрес"
                                     id="geo"
                                     variant="filled"
                                     value={geo}
                                     onChange={onChangeGeodata}
                    />
                </div>
                {/* <div className="text-field text-field_floating">
                    <GeoInput
                        add={addGeo}
                        value={geo}
                        //value={geodata}
                        //onChange={onChangeGeodata}
                    />
                </div> */}

                {/*Техническое задание*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     style={{backgroundColor: '#2A2731', borderRadius: '4px'}}
                                     id="outlined-multiline-flexible"
                                     label="Техническое задание"
                                     variant="filled"
                        // value={post.teh}
                        // onChange={e => setPost({...post, teh: e.target.value})}
                                     value={teh}
                                     onChange={onChangeTeh}
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
                                selectedElement={selectedElement}
                                setSelectedElement={setSelectedElement}
                                onChange={onCategoriesSelectChange}
                            />
                        </div>

                        <div>
                            <CustomSelect
                                disabled={disabled}
                                id="model"
                                title="Специальность"
                                options={models}
                                selectedElement={selectedElement}
                                setSelectedElement={setSelectedElement}
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
                            value={count}
                            onChange={e => setWorker({...worker, count: e.target.value})}
                        />
                        <img style={{verticalAlign: 'middle', marginLeft: '10px'}} src={ButtonPlus} onClick={increment} alt='Плюс'/>
                    </div>

                    <p>
                        <MyButton
                            disabled={disabledBtn}
                            style={{width: "103px", marginBottom: "15px"}}
                            onClick={addNewWorker}
                        >Добавить
                        </MyButton>
                    </p>

                </div>

                <WorkerList remove={removeWorker} workers={workers} />


                <MyModal visible={modal} setVisible={setModal}>
                    {tex}
                </MyModal>

                {/* <MyButton onClick={console.log(workers)}>Создать проект</MyButton> */}
            </form>

        </div>
    );
}

export default NewProject;