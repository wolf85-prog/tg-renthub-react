import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewProject.css';
import {Stack} from "@mui/material";
import TextField from '@mui/material/TextField';
import CalendarIcon from "@mui/icons-material/CalendarToday";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { alpha, styled } from '@mui/material/styles';
import Counter from "../../components/Counter/Counter";
import Header from "../../components/Header/Header";
import WorkerList from "../../components/WorkerList/WorkerList";
import EquipmentList from "../../components/EquipmentList/EquipmentList";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import CustomSelect2 from "../../components/UI/CustomSelect2/CustomSelect2";
import ButtonMinus from "../../img/minus.png";
import ButtonPlus from "../../img/plus.png";
import ButtonMinus2 from "../../img/minus2.png";
import ButtonPlus2 from "../../img/plus2.png";
import Calendar from "../../img/calendar.svg";
import GeoInput from "../../components/UI/GeoInput/GeoInput";

import MyModal from "../../components/MyModal/MyModal";
import Loader from "../../components/UI/Loader/Loader";
import specData from "../../data/specData"
import dataEquipment from "../../data/dataEquipment"

import { createManagerApi, getManagerApi, getManagerIdApi, getCompanyIdApi } from './../../http/projectAPI';


const NewProject = () => {

    const API_URL = process.env.REACT_APP_API_URL


    const navigate = useNavigate();
    const {tg, queryId, user} = useTelegram();

    const { count, setCount } = useUsersContext();

    const [modal, setModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)

    const [showWorkadd, setShowWorkadd] = useState(false)
    const [showEquipmentadd, setShowEquipmentadd] = useState(false)
    const [showSpec, setShowSpec] = useState(false)
    const [showName, setShowName] = useState(false)
    const [showSubname, setShowSubname] = useState(false)

    const [showButtonEquipmentadd, setShowButtonEquipmentadd] = useState(true)

    // текущая дата
    const dateNow = new Date();
    const month = String(dateNow.getMonth()+1).padStart(2, "0");
    const date = dateNow.getFullYear() + "-" + month + "-01 10:00:00"

    //проект
    const [project, setProject] = useState('');
    const [datestart, setDatestart] = useState(date);
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

    const [disabled, setDisabled] = useState(true)
    const [disabled2, setDisabled2] = useState(true)
    const [disabled3, setDisabled3] = useState(true)

    //работник
    const [worker, setWorker] = useState({id: '', cat: '', spec: '', count: 1, icon: ''})
    const [worker2, setWorker2] = useState({id: '', cat: '', spec: '', count: 1, icon: ''})

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
    const [chatId, setChatId] = useState('')

    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef()


    const [showNotif, setShowNotif] = useState(false)
    const [showNotif2, setShowNotif2] = useState(false)
    const [showNotif3, setShowNotif3] = useState(false)
    const [showNotif4, setShowNotif4] = useState(false)
    const [showNotif5, setShowNotif5] = useState(false)
    const [showNotif6, setShowNotif6] = useState(false)
    const [showNotif7, setShowNotif7] = useState(false)

    function isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    useEffect(()=> {
        setShowNotif(true)
        setShowNotif2(false)
    }, [])
    

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetch = async() => {
            setIsLoading(true);
            
            //поиск менеджера в БД (кэш)
            const manager = await getManagerApi(user?.id) //user?.id '805436270' '1408579113' '371602681' '1853131218' '6458794597' '1698411118' 6143011220

            //если менеджер не найден, то искать в notion
            if (isEmptyObject(manager)) {
                console.log("Менеджер не найден!")
                
                //поиск менеджера в notion
                const managerId = await getManagerIdApi(user?.id)
                console.log("Менеджер из ноушен: ", managerId)
                
                //если менеджер не найден, то создать в notion
                if (isEmptyObject(managerId)) {
                  const newManager = await createManagerApi({
                        id: (user?.id).toString(), 
                        firstname: user?.first_name,
                        lastname: user?.last_name,
                    })  

                    //получить данные менеджера после создания
                    setTimeout(async ()=> {
                        const managerId = await getManagerIdApi(user?.id)
                        const companyId = await getCompanyIdApi(user?.id)
                        console.log(managerId)
    
                        if (isEmptyObject(managerId)) {
                            console.log("Опять ошибка") 
                            setIsLoading(false) 
                            setModal(true)
                        } else {
                            console.log("Данные успешно сохранены!")
                            setManagerId(managerId)
                            setCompanyId(companyId)
                            setIsLoading(false)
                            setModalInfo(true) 
                        }    
                        
                    }, 2000) 
                } else {
                    console.log("Менеджер найден в ноушене!")
                    setManagerId(managerId)
                    setIsLoading(false) 
                }   

            } else {
                console.log(console.log("manager cash: ", manager))
                setManagerId(manager.id)
                setCompanyId(manager.companyId)
                
                setIsLoading(false) 
            }

            setChatId(user?.id) 

            //---------категории-----------------------

            // устанавливаем категории
            if (specData.length > 0 && specData) {
                setCategories(specData);
                //console.log("specData: ", specData)
            }

            // и модели из первой категории по умолчанию
            // if (specData.length > 0 && specData[0].models && specData[0].models.length > 0) {
            //     setModels(specData[0].models);
            // }

            
            // устанавливаем категории оборудования
            // if (dataEquipment.length > 0 && dataEquipment) {
            //     setCategories2(dataEquipment);
            // }

            // и наименования оборудования из первой категории по умолчанию
            // if (dataEquipment.length > 0 && dataEquipment[0].names && dataEquipment[0].names.length > 0) {
            //     setNames(dataEquipment[0].names);
            // }

            // и поднаименования оборудования из первой категории по умолчанию
            // if (dataEquipment.length > 0 && dataEquipment[0].subnames && dataEquipment[0].subnames.length > 0 ) {
            //     //setNames(dataEquipment[0].names);
            //     setSubNames(dataEquipment[0].subnames);
            // }
        }

        fetch()

    }, []);

    {/* Обновить */}
    const clickButton = async(e) => {
        e.preventDefault();
        setModal(false)
        setIsLoading(true) 

        const newManager = await createManagerApi({
            id: user?.id, 
            firstname: user?.first_name,
            lastname: user?.last_name,
        }) 

        //получить данные менеджера после создания
        setTimeout(async ()=> {
            const managerId = await getManagerIdApi(user?.id)
            const companyId = await getCompanyIdApi(user?.id)
            console.log(managerId)

            if (isEmptyObject(managerId)) {
                console.log("Опять ошибка") 
                setIsLoading(false) 
                setModal(true)
            } else {
                console.log("Данные успешно сохранены!")
                setModalInfo(true)

                setManagerId(managerId)
                setCompanyId(companyId)
                setIsLoading(false) 
                setModal(false)  
            }    
            
        }, 2000) 
    }


    // const createManager = (id) => {
    //     const data = {
    //         id: id.toString(),
    //         firstname: user?.first_name,
    //         lastname: user?.last_name,
    //     }

    //     fetch(API_URL + 'manager', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }

    // const getManagerId2 = (id) => {
    //     const url = API_URL_MANAGER + id; //id
    //     const headers = { 'Content-Type': 'application/json' }
    //     fetch(url, { headers })
    //         .then(response => { 
    //             return response.json()               
    //         })
    //         .then(data => {
    //             console.log('ManagerId: ', data) 
    //             setManagerId(data)                
    //             getCompanyId(user?.id);                                      
    //         })
    // }

    // const getManagerId = (id) => {
    //     const url = API_URL_MANAGER + id; //id
    //     const headers = { 'Content-Type': 'application/json' }
    //     fetch(url, { headers })
    //         .then(response => { 
    //             return response.json()               
    //         })
    //         .then(data => {
    //             if (isEmptyObject(data)) {
    //                 console.log('Данные о менеджере (' + id + ', ' + user?.first_name + ') отсутствуют БД! Создаем менеджера!')
    //                 createManager(id)
    //                 setTimeout(async ()=> {
    //                     getManagerId2(id)
    //                 }, 4000)                    
    //             } else {
    //                 console.log('ManagerId: ', data) 
    //                 setManagerId(data)                
    //                 getCompanyId(id);  
    //             } 
                                      
    //         })
    // }

    // const getCompanyId = (id) => {
    //     const url = API_URL_COMPANY + id;
    //     const headers = { 'Content-Type': 'application/json' }
    //     fetch(url, { headers })
    //         .then(response => { 
    //             return response.json()               
    //         })
    //         .then(data => {
    //             console.log('CompanyId: ', data)
    //             //isEmptyObject(data) ? setModal(true) : setModal(false)
    //             setCompanyId(data) 
    //             setIsLoading(false) 
    //             setChatId(user?.id)          
    //         })
    // }

    //------------------------------------------------------

    
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

    // function increment2() {
    //     setCount2(count2 + 1)
    //     setEquipment({...equipment, count: count2 + 1})
    // }

    // function decrement2() {
    //     if (count2 != 1 && count2 > 0) {
    //         setCount2(count2 - 1)
    //         setEquipment({...equipment, count: count2 - 1})
    //     }     
    // }

    



    const onChangeProject = (e) => {
        setProject(e.target.value)
        setShowNotif(false)
        setShowNotif2(true)
    }

    const onChangeTime = (e) => {
        setDatestart(e.target.value)
        setShowNotif2(false)
        setShowNotif3(true)
    }

    function addGeo (newGeo) {
        //setPost({...post, geo: newGeo})
        setGeo(newGeo)
    }

    const onChangeGeodata = (e) => {
        setGeo(e.target.value)
        console.log(e.target.value)

        setShowNotif6(false)
        setShowNotif7(true)
    }

    const onChangeTeh = (e) => {
        setTeh(e.target.value)
        setCountChar(e.target.value.length)
        setShowNotif7(false)
    }
//---------------------------------------------------------------------------------------

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        setSelectedElement(e.target.options.value);

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = e.target.options[e.target.selectedIndex].value;

        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories.find(item => item.id === parseInt(categoryId));

        const catSelect = category.icon; 
        const iconCatSelect = category.icon;

        setWorker({...worker, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        // const models = category.models && category.models.length > 0
        //     ? category.models
        //     : [{ id: 0, name: 'Нет моделей', items: [] }];
        const models = category.models

        // меняем модели во втором списке
        setModels(models);

        setDisabled(false)
        setShowSpec(true)

        setShowNotif3(false)
        setShowNotif4(true)
    }

    // 2. выбор специальности
    const onSpecSelectChange = (e) => {
        setSelectedElement(e.target.options.value);

        const modelId = e.target.options[e.target.selectedIndex].value;
        const model = models.find(item => item.id === parseInt(modelId));

        setWorker({...worker, spec: model.name})
        //setWorker2({...worker, spec: model.name})

        setDisabledBtn(false)  

        setShowNotif3(false)
        setShowNotif4(false)
        setShowNotif5(true)
    }



    // useEffect(()=> {
    //     if (worker2.cat !== '' || worker2.spec !== '') {
    //         setWorkers([...workers, {...worker2, id: Date.now()}])
    //     }
    //     //setWorker({cat: '', spec: '', count: 1, icon: ''})
    //     //setWorker2({cat: '', spec: '', count: 1, icon: ''})

    //     setCount(1);
    //     setSelectedElement("");

    //     setDisabled(true);
    //     setShowSpec(false)
    //     setDisabledBtn(true);
    // }, [worker2])


     {/* Показать Добавление работника */}
     const clickShowWorker = (e) => {
        e.preventDefault();

        showWorkadd ? setShowWorkadd(false) : setShowWorkadd(true)

        //setShowButtonEquipmentadd(false)
        showButtonEquipmentadd ? setShowButtonEquipmentadd(false) : setShowButtonEquipmentadd(true)
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
        setShowSpec(false)
        setDisabledBtn(true);

        setShowNotif5(false)
        setShowNotif6(true)
    }

    {/* Удаление работника */}
    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }

    {/* Правка работника */}
    const changeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }


 //----------------------------------------------------------------------------------------------------   

    //оборудование
    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange2 = (e) => {

        setSelectedElement2(e.target.options.value);

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);

        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories2.find(item => item.id === categoryId);
        const catSelect = category.icon; //capitalizeFirst(category.name);
        const iconCatSelect = category.icon;

        setEquipment({...equipment, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        const nameSelect = category.names && category.names.length > 0
            ? category.names
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        // меняем модели во втором списке
        setNames(nameSelect);

        setDisabled2(false)
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

        setDisabled3(false)
        setShowSubname(true)
    }

    // 3. выбор поднаименования оборудования
    const onSubNameSelectChange = (e) => {
        setSelectedElement3(e.target.options.npvalue);

        const subnameId = parseInt(e.target.options[e.target.selectedIndex].value);
        const subnameSelect = subnames.find(item => item.id === subnameId);

        setEquipment({...equipment, subname: subnameSelect.name})

        setDisabledBtn2(false)
    }


    {/* Показать Добавление оборудования */}
    const clickShowEquipment = (e) => {
        e.preventDefault();

        showEquipmentadd ? setShowEquipmentadd(false) : setShowEquipmentadd(true)

        //scrollRef.current?.scrollIntoView( {behavior: "smooth"})
        window.scrollTo({ behavior: 'smooth', top: scrollRef.current.offsetTop })
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

        setDisabled2(true);
        setDisabled3(true);
        setShowName(false)
        setShowSubname(false)
        setDisabledBtn2(true);
    }

    {/* Удаление оборудования */}
    const removeEquipment = (equipment) => {
        setEquipments(equipments.filter(p => p.id !== equipment.id))
    }

//-------------------------------------------------------------------------------------

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
            chatId,
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
        
        setIsLoading(false)
              
    }, [project, workers, equipments, datestart, geo, teh, managerId, companyId, chatId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.show();
        
        workers.length > 0
        ? tg.MainButton.setParams({
            text: 'Новый проект',
            color: '#000' //'#2e2e2e'
        })
        :  tg.MainButton.setParams({
            text: 'Новый проект',
            color: '#fff' //'#2e2e2e'
        })
    }, [workers])

    useEffect(() => {
        if (workers.length > 0) {
            tg.MainButton.enable();
        } else {
            tg.MainButton.disable();
        }  
    }, [workers])

    let tex = 'Ведутся технические работы!'
    const update_company = 'Данные о заказчике не найдены! Создание проекта без данных о заказчике невозможно!'


    useEffect(()=>{
        tg.setHeaderColor('#121212') // установка цвета хедера
        tg.setBackgroundColor('#121212') // установка цвета бэкграунда
        
    }, [])


    const handleClick = () => navigate('/');

    useEffect(() => {
        tg.onEvent("backButtonClicked", handleClick)
        return () => {
            tg.offEvent('backButtonClicked', handleClick)
        }
    }, [handleClick])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    return (

        <div className="App">
            <Header header={{title: 'Новый проект', icon: 'false'}}/>

            {isLoading
                ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}><Loader/></div>
                : <form>
                {/*Название*/}
                <div className={'text-field text-field_floating ' + (showNotif ? 'block-anim' : '')} style={{border: showNotif ? '2px solid red' : '2px solid #26aad4', borderRadius: '10px'}}>
                    <RedditTextField
                        fullWidth
                        label="Название проекта"
                        id="project_name"
                        variant="filled"
                        value={project}
                        onChange={onChangeProject}
                    />
                </div>

                {/*Дата начала*/}
                <div className={'text-field text-field_floating ' + (showNotif2 ? 'block-anim' : '')}>
                    <RedditTextField
                        style={{backgroundColor: '#2A2731', border: showNotif2 ? '2px solid red' : '2px solid #26aad4', borderRadius: '10px'}}
                        fullWidth
                        label="Дата начала"
                        id="datetime-local"
                        variant="filled"
                        value={datestart}
                        onChange={onChangeTime}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', border: showNotif2 ? '2px solid red' : '2px solid #26aad4', borderRadius: '10px'}}>
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
                              <CalendarIcon style={{color: '#26aad4', width: '28px', height: '28px'}}/>
                            </span>
                        </Stack>
                    </LocalizationProvider> */}
                </div>


                {/* <MyButton onClick={clickShowWorker} style={{ width: '230px' }}>{showWorkadd ? 'Убрать специалистов' : 'Добавить специалистов'}</MyButton> */}
                {/* <div style={{ display: showWorkadd ? "block" : "none" }}> */}
                    <label>
                        <p
                            style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '14px',
                                color: '#26aad4',
                            }}>Добавить специалистов</p>

                        <div className={'text-field text-field_floating ' + (showNotif3 ? 'block-anim' : '')} >
                            <CustomSelect
                                id="category"
                                title="Категория"
                                options={categories}
                                selectedElement={selectedElement}
                                setSelectedElement={setSelectedElement}
                                onChange={onCategoriesSelectChange}
                                style={{border: showNotif3 ? '2px solid red' : '2px solid #26aad4'}}
                            />
                        </div>

                        <div className={'text-field text-field_floating ' + (showNotif4 ? 'block-anim' : '')} style={{ display: showSpec ? "block" : "none" }}>
                            <CustomSelect
                                disabled={disabled}
                                id="model"
                                title="Специальность"
                                options={models}
                                selectedElement={selectedElement}
                                setSelectedElement={setSelectedElement}
                                onChange={onSpecSelectChange}
                                style={{border: showNotif4 ? '2px solid red' : '2px solid #26aad4'}}
                            />
                        </div>
                    </label>


                    <p style={{marginTop: "15px", color: '#26aad4'}}>
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
                            style={{width: "103px", marginBottom: "15px", border: showNotif5 ? '2px solid red' : '2px solid #26aad4'}}
                            onClick={addNewWorker}
                        >Добавить
                        </MyButton>
                    </p>

                {/* </div> */}

                {/*список работников*/}
                <WorkerList remove={removeWorker} workers={workers} change={changeWorker}/>

                

                {/*Добавить оборудование*/}  
                {/* <MyButton 
                    onClick={clickShowEquipment} 
                    style={{ width: '230px', borderColor: '#ecff76', backgroundColor: '#ecff76', color: '#000000', display: showButtonEquipmentadd ? "" : "none"}}
                >
                    {showEquipmentadd ? 'Убрать оборудование' : 'Добавить оборудование'}
                </MyButton> */}
            
                {/* <div style={{ display: showEquipmentadd ? "block" : "none" }}>
                    <label>
                        <p style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '14px',
                                color: '#ECFF76',
                            }}>Добавьте оборудование
                        </p>

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
                    </label> */}


                    {/* <p style={{marginTop: "15px", color: '#ECFF76'}}>
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

                </div>*/}

                {/*список оборудования*/}
                {/* <EquipmentList remove={removeEquipment} equipments={equipments} />  */}


                {/*Адрес*/}
                <div className={'text-field text-field_floating ' + (showNotif6 ? 'block-anim' : '')} style={{border: showNotif6 ? '2px solid red' : '2px solid #26aad4', borderRadius: '10px'}}>
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
                <div className={'text-field text-field_floating ' + (showNotif7 ? 'block-anim' : '')} style={{marginTop: '25px'}}>
                    <RedditTextField fullWidth
                                     style={{borderRadius: '10px',  border: showNotif7 ? '2px solid red' : '2px solid #26aad4'}}
                                     id="outlined-multiline-flexible"
                                     label="Техническое задание"
                                     variant="filled"
                                     value={teh}
                                     onChange={onChangeTeh}
                                     multiline
                                     rows={4}
                                     inputProps={{maxLength :500}}
                                    //  helperText = {`${countChar}/500`}
                    />
                    <p className='count-char'>{countChar}/500</p>
                </div>
                
                

                <MyModal visible={modal} setVisible={setModal}>
                    <div>
                        <h2><b>Предупреждение</b></h2>
                        <hr/>
                        <br/>
                        {update_company}
                        <br/>
                        <br/>
                        <MyButton onClick={clickButton}>Обновить</MyButton>
                    </div>
                    
                </MyModal>

                <MyModal visible={modalInfo} setVisible={setModalInfo}>
                    <div>
                        <h2><b>Информация</b></h2>
                        <hr/>
                        <br/>
                        <h3>Аккаунт менеджера успешно создан!</h3>
                        <br/>
                        <br/>
                        <MyButton onClick={()=>setModalInfo(false)}>ОК</MyButton>
                    </div>
                    
                </MyModal>

                {/* <MyButton onClick={console.log(workers)}>Создать проект</MyButton> */}
                </form>
            }
        </div>
    );
}

export default NewProject;

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        // border:  '2px solid #26aad4',
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
