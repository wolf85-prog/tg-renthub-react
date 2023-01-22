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
import EquipmentList from "../../components/EquipmentList/EquipmentList";
import {useNavigate} from "react-router-dom";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import CustomSelect2 from "../../components/UI/CustomSelect2/CustomSelect2";
import ButtonMinus from "../../img/minus.png";
import ButtonPlus from "../../img/plus.png";
import ButtonMinus2 from "../../img/minus2.png";
import ButtonPlus2 from "../../img/plus2.png";
import Calendar from "../../img/calendar.svg";
import GeoInput from "../../components/UI/GeoInput/GeoInput";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";
import Loader from "../../components/UI/Loader/Loader";

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '2px solid #76A9FF',
        overflow: 'hidden',
        borderRadius: 10,
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
            {id: 1, name: 'Помощник \/ Грузчик',},
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
        icon: 'Trucks',
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


const dataEquipment = [
    {
        id: 1,
        name: 'SOUND',
        icon: 'Sound',
        names: [
            {
                id: 1, 
                name: 'P.A. system',
                subnames: [
                    {id: 1, name: 'dB Technologies',},
                    {id: 2, name: 'L-Acoustics',},
                    {id: 3, name: 'Meyer Sound',},
                    {id: 4, name: 'Nexo',},
                    {id: 5, name: 'Turbosound',},
                    {id: 6, name: 'Clair Brothers',},
                    {id: 7, name: 'Coda Audio',},
                    {id: 8, name: 'Electro Voice',},
                    {id: 9, name: 'EAW',},
                    {id: 10, name: 'Bose',},
                    {id: 11, name: 'RCF',},
                    {id: 12, name: 'JBL',},
                    {id: 13, name: 'HK Audio',},
                    {id: 14, name: 'Martin Audio',},
                    {id: 15, name: 'Funktion One',},
                    {id: 16, name: 'Peavey',},
                    {id: 17, name: 'Yorkville',},
                    {id: 18, name: 'Dynacord',},
                    {id: 19, name: 'Mackie',},
                    {id: 20, name: 'QSC',},
                    {id: 21, name: 'Nova',},
                    {id: 22, name: 'Other',},
                ]
            },
            {
                id: 2, 
                name: 'Amplifires',
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
            {
                id: 3, 
                name: 'Monitor wedge',
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
            {
                id: 4, 
                name: 'Mixer desk',
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
            {
                id: 5, 
                name: 'Stage rack',
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
            {
                id: 6, 
                name: 'Wireless system',
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
            {
                id: 7, 
                name: 'Antenna',
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
            {id: 8, name: 'I.E.M', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 9, name: 'Microfone', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 10, name: 'Backline', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 11, name: 'Cat cable', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 12, name: 'Power cable', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 13, name: 'XLR', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 14, name: 'Powercon', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 15, name: 'SpeaconCat cable', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 16, name: 'IBP', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 17, name: 'Other', subnames: [{id: 1, name: 'Оборудование',},]},
        ]
    },
    {
        id: 2,
        name: 'LIGHT',
        icon: 'Light',
        names: [
            {id: 1, name: 'Light desk', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 2, name: 'Farm construction', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 3, name: 'Beam', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 4, name: 'Wash', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 1, name: 'Strobe', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 2, name: 'Smoke machine', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 3, name: 'Power cable', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 4, name: 'DMX', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 3, name: 'Splitter', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 4, name: 'Other', subnames: [{id: 1, name: 'Оборудование',},]},
        ]
    },
    {
        id: 3,
        name: 'VIDEO',
        icon: 'Video',
        names: [
            {id: 1, name: 'Camera', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 2, name: 'Video console', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 3, name: 'Led monitor', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 4, name: 'Server', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 5, name: 'Card', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 6, name: 'Kinoflo', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 7, name: 'Other', subnames: [{id: 1, name: 'Оборудование',},]},
        ]
    },
    {
        id: 4,
        name: 'RIGGERS',
        icon: 'Riggers',
        names: [
            {id: 1, name: 'Моторы', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 2, name: 'Такелаж', subnames: [{id: 1, name: 'Оборудование',},]},
        ]
    },
    {
        id: 5,
        name: 'STAGE GROUND',
        icon: 'StageGround',
        names: [
            {id: 1, name: 'Layher', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 2, name: 'Фермы', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 3, name: 'Станки', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 4, name: 'Ноги', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 5, name: 'Шатры', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 6, name: 'Аттракционы', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 7, name: 'Надувные конструкции', subnames: [{id: 1, name: 'Оборудование',},]},
        ]
    },
    {
        id: 6,
        name: 'TRUCKS',
        icon: 'Trucks',
        names: [
            {id: 1, name: 'C личным ТС [B]', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 2, name: 'Без личного ТС [B]', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 3, name: 'C личным ТС [C]', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 4, name: 'Без личного ТС [C]', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 5, name: 'С гидролифтом', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 6, name: 'Без гидролифта', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 7, name: 'Грузоподъемность 4 т.', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 8, name: 'Грузоподъемность 6 т.', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 9, name: 'Грузоподъемность 7 т.', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 10, name: 'Грузоподъемность 8 т.', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 11, name: 'Грузоподъемность 10 т.', subnames: [{id: 1, name: 'Оборудование',},]},
            {id: 12, name: 'Грузоподъемность 14 т.', subnames: [{id: 1, name: 'Оборудование',},]},
        ]
    },
    {
        id: 7,
        name: 'PRODUCTION',
        icon: 'Production',
        names: [
            {
                id: 1, 
                name: 'Мероприятие под ключ', 
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
            {
                id: 2, 
                name: 'Отдельные технические задачи', 
                subnames: [
                    {id: 1, name: 'Оборудование',},
                ]
            },
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
    const [showWorkadd, setShowWorkadd] = useState(false)
    const [showEquipmentadd, setShowEquipmentadd] = useState(false)
    const [showSpec, setShowSpec] = useState(false)
    const [showName, setShowName] = useState(false)
    const [showSubname, setShowSubname] = useState(false)

    //проект
    const [post, setPost] = useState({title: '', time: '', geo: '', teh: '', status: ''})

    const [project, setProject] = useState('');
    const [datestart, setDatestart] = useState('2023-01-01 10:00:00');
    const [teh, setTeh] = useState('');
    const [countChar, setCountChar] = useState(0);

    //геолокация
    const [geo, setGeo] = useState('');

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    //категории2
    const [categories2, setCategories2] = useState([]);
    //наименование оборудования
    const [names, setNames] = useState([]);
    const [subnames, setSubNames] = useState([]);

    const [disabledBtn, setDisabledBtn] = useState(true)
    const [disabledBtn2, setDisabledBtn2] = useState(true)

    //количество работников
    const [count, setCount] = useState(1)
    //работник
    const [worker, setWorker] = useState({id: '', cat: '', spec: '', count: 1, icon: ''})
    //работники
    const [workers, setWorkers] = useState([])

    //количество оборудования
    const [count2, setCount2] = useState(1)
    //оборудование
    const [equipment, setEquipment] = useState({id: '', cat: '', name: '', subname: '', count: 1, icon: ''})
    //оборудования
    const [equipments, setEquipments] = useState([])

    //select
    const [selectedElement, setSelectedElement] = useState("")
    //select2
    const [selectedElement2, setSelectedElement2] = useState("")
    //select3
    const [selectedElement3, setSelectedElement3] = useState("")

    const [managerId, setManagerId] = useState('')
    const [companyId, setCompanyId] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    function isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    const getManagerId = (id) => {
        const url = API_URL_MANAGER + id; //id
        const headers = { 'Content-Type': 'application/json' }
        fetch(url, { headers })
            .then(response => { 
                return response.json()               
            })
            .then(data => {
                console.log('ManagerId: ', data) 
                setManagerId(data)  
                getCompanyId(user?.id);       
            })
    }

    const getCompanyId = (id) => {
        const url = API_URL_COMPANY + id;
        const headers = { 'Content-Type': 'application/json' }
        fetch(url, { headers })
            .then(response => { 
                return response.json()               
            })
            .then(data => {
                console.log('CompanyId: ', data)
                isEmptyObject(data) ? setModal(true) : setModal(false)
                setCompanyId(data) 
                setIsLoading(false)           
            })
    }

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setIsLoading(true);

        getManagerId(user?.id); //user?.id


        // устанавливаем категории
        if (data.length > 0 && data) {
            setCategories(data);
        }

        // и модели из первой категории по умолчанию
        if (data.length > 0 && data[0].models && data[0].models.length > 0) {
            setModels(data[0].models);
        }

        
        // устанавливаем категории оборудования
        if (dataEquipment.length > 0 && dataEquipment) {
            setCategories2(dataEquipment);
        }

        // и наименования оборудования из первой категории по умолчанию
        if (dataEquipment.length > 0 && dataEquipment[0].names && dataEquipment[0].names.length > 0) {
            setNames(dataEquipment[0].names);
        }

        // и поднаименования оборудования из первой категории по умолчанию
        if (dataEquipment.length > 0 && dataEquipment[0].subnames && dataEquipment[0].subnames.length > 0 ) {
            //setNames(dataEquipment[0].names);
            setSubNames(dataEquipment[0].subnames);
        }


    }, []);

    //------------------------------------------------------

    {/* Обновить */}
    const clickButton = (e) => {
        e.preventDefault();

        getCompanyId(user?.id)
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

    function increment2() {
        setCount2(count2 + 1)
        setEquipment({...equipment, count: count2 + 1})
    }

    function decrement2() {
        if (count2 != 1 && count2 > 0) {
            setCount2(count2 - 1)
            setEquipment({...equipment, count: count2 - 1})
        }     
    }



    //Название категории с большой буквы
    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


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
        setCountChar(e.target.value.length)
    }
//---------------------------------------------------------------------------------------

    // 1. при выборе нового значения в категории
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

        //setDisabled(false)
        setShowSpec(true)
    }

    // 2. выбор специальности
    const onSpecSelectChange = (e) => {
        setSelectedElement(e.target.options.value);

        const modelId = parseInt(e.target.options[e.target.selectedIndex].value);
        const model = models.find(item => item.id === modelId);

        setWorker({...worker, spec: model.name})

        setDisabledBtn(false)
    }


    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange2 = (e) => {

        setSelectedElement2(e.target.options.value);

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);

        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories2.find(item => item.id === categoryId);
        const catSelect = capitalizeFirst(category.name);
        const iconCatSelect = category.icon;

        setEquipment({...equipment, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        const nameSelect = category.names && category.names.length > 0
            ? category.names
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        // меняем модели во втором списке
        setNames(nameSelect);

        //setDisabled2(false)
        setShowName(true)
    }

    // 2. выбор наименования оборудования
    const onNameSelectChange3 = (e) => {
        setSelectedElement2(e.target.options.value);

        const nameId = parseInt(e.target.options[e.target.selectedIndex].value);
        const nameSelect = names.find(item => item.id === nameId);

        setEquipment({...equipment, name: nameSelect.name})

         // выбираем все поднаименования в наименовании, если таковые есть
         const subname = nameSelect.subnames && nameSelect.subnames.length > 0
         ? nameSelect.subnames
         : [{ id: 0, subname: 'Нет оборудования', items: [] }];

        // меняем модели во 3-м списке
        setSubNames(subname);

        //setDisabled3(false)
        setShowSubname(true)
    }

    // 3. выбор поднаименования оборудования
    const onSubNameSelectChange = (e) => {
        setSelectedElement3(e.target.options.value);

        const subnameId = parseInt(e.target.options[e.target.selectedIndex].value);
        const subnameSelect = subnames.find(item => item.id === subnameId);

        setEquipment({...equipment, subname: subnameSelect.name})

        setDisabledBtn2(false)
    }

     {/* Показать Добавление работника */}
     const clickShowWorker = (e) => {
        e.preventDefault();

        showWorkadd ? setShowWorkadd(false) : setShowWorkadd(true)
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

        //setDisabled(true);
        setShowSpec(false)
        setDisabledBtn(true);
    }

    {/* Удаление работника */}
    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }


    {/* Показать Добавление оборудования */}
    const clickShowEquipment = (e) => {
        e.preventDefault();

        showEquipmentadd ? setShowEquipmentadd(false) : setShowEquipmentadd(true)
    }


    {/* Добавление оборудования */}
    const addNewEquipment = (e) => {
        e.preventDefault();

        //if (equipment.cat !== '' || equipment.name !== '') {
            setEquipments([...equipments, {...equipment, id: Date.now()}])
        //}

        setEquipment({cat: '', name: '', subname: '', count: 1, icon: ''})

        setCount2(1);
        setSelectedElement2(""); 

        //setDisabled2(true);
        //setDisabled3(true);
        setShowName(false)
        setShowSubname(false)
        setDisabledBtn2(true);
    }

    {/* Удаление оборудования */}
    const removeEquipment = (equipment) => {
        setEquipments(equipments.filter(p => p.id !== equipment.id))
    }


    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {
        const data = {
            projectname: project,
            datestart,
            geo,
            teh,
            worklist: workers,
            equipmentlist: equipments,
            managerId,
            companyId,
            queryId,
        }

        tg.MainButton.hide();
        setIsLoading(true)

        fetch(API_URL + 'web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
              
    }, [project, workers, equipments, datestart, geo, teh, managerId, companyId])

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
        if ((workers.length > 0) || (equipments.length > 0)) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }  
    }, [workers, equipments])

    let tex = 'Ведутся технические работы!'
    const update_company = 'Данные о заказчике не найдены! Создание проекта без данных о заказчике невозможно!'


    return (

        <div className="App">
            <Header header={{title: 'Новый проект', icon: 'false'}}/>

            {isLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <form>
                {/*Название*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Название проекта"
                                     id="project_name"
                                     variant="filled"
                                     value={project}
                                     onChange={onChangeProject}
                    />
                </div>

                {/*Дата начала*/}
                <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '10px'}}>
                            <RedditTextField
                                id="datetime-local"
                                label="Дата начала"
                                type="datetime-local"
                                variant="filled"
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
                                     style={{borderRadius: '10px'}}
                                     id="outlined-multiline-flexible"
                                     label="Техническое задание"
                                     variant="filled"
                                     value={teh}
                                     onChange={onChangeTeh}
                                     multiline
                                     rows={4}
                                     inputProps={{maxLength :300}}
                                     helperText = {`${countChar}/300`}
                    />
                </div>

                <MyButton onClick={clickShowWorker} style={{ width: '230px' }}>{showWorkadd ? 'Убрать специалистов' : 'Добавить специалистов'}</MyButton>
                <div style={{ display: showWorkadd ? "block" : "none" }}>
                    <label>
                        <p
                            style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '14px',
                                color: '#76A9FF',
                            }}>Добавить специалистов</p>

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

                        <div className="text-field text-field_floating" style={{ display: showSpec ? "block" : "none" }}>
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


                    <p style={{marginTop: "15px", color: '#76A9FF'}}>
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

                {/*список работников*/}
                <WorkerList remove={removeWorker} workers={workers} />

                

                {/*Добавить оборудование*/}  
                <MyButton 
                    onClick={clickShowEquipment} 
                    style={{ width: '230px', borderColor: '#ecff76', backgroundColor: '#ecff76', color: '#000000'}}
                >
                    {showEquipmentadd ? 'Убрать оборудование' : 'Добавить оборудование'}
                </MyButton>
                <div style={{ display: showEquipmentadd ? "block" : "none" }}>
                    <label>
                        <p
                            style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '14px',
                                color: '#ECFF76',
                            }}>Добавьте оборудование</p>

                        <div className="text-field text-field_floating">
                            <CustomSelect2
                                id="category2"
                                title="Категория"
                                options={categories2}
                                selectedElement={selectedElement2}
                                setSelectedElement={setSelectedElement2}
                                onChange={onCategoriesSelectChange2}
                            />
                        </div>

                        <div className="text-field text-field_floating" style={{ display: showName ? "block" : "none" }}>
                            <CustomSelect2
                                disabled={disabled2}
                                id="name"
                                title="Подкатегория"
                                options={names}
                                selectedElement={selectedElement2}
                                setSelectedElement={setSelectedElement2}
                                onChange={onNameSelectChange3}
                            />
                        </div>

                        <div className="text-field text-field_floating" style={{ display: showSubname ? "block" : "none" }}>
                            <CustomSelect2
                                disabled={disabled3}
                                id="subname"
                                title="Наименование"
                                options={subnames}
                                selectedElement={selectedElement2}
                                setSelectedElement={setSelectedElement2}
                                onChange={onSubNameSelectChange}
                            />
                        </div>
                    </label>


                    <p style={{marginTop: "15px", color: '#ECFF76'}}>
                        Количество
                    </p>

                    <div>
                        <img style={{verticalAlign: 'middle', marginRight: '10px'}} src={ButtonMinus2} onClick={decrement2} alt='Минус'/>
                        <Counter
                            style={{borderColor: '#ECFF76'}}
                            value={count2}
                            onChange={e => setEquipment({...equipment, count: e.target.value})}
                        />
                        <img style={{verticalAlign: 'middle', marginLeft: '10px'}} src={ButtonPlus2} onClick={increment2} alt='Плюс'/>
                    </div>

                    <p>
                        <MyButton
                            disabled={disabledBtn2}
                            style={{width: "103px", marginBottom: "15px", borderColor: '#ECFF76', backgroundColor: '#ECFF76', color: '#000000'}}
                            onClick={addNewEquipment}
                        >Добавить
                        </MyButton>
                    </p>

                </div>

                {/*список оборудования*/}
                <EquipmentList remove={removeEquipment} equipments={equipments} /> 
                

                <MyModal visible={modal} setVisible={setModal}>
                    <h2><b>Предупреждение</b></h2>
                    <hr/>
                    <br/>
                    {update_company}
                    <br/>
                    <br/>
                    <MyButton onClick={clickButton}>Обновить</MyButton>
                </MyModal>

                {/* <MyButton onClick={console.log(workers)}>Создать проект</MyButton> */}
                </form>
            }
        </div>
    );
}

export default NewProject;