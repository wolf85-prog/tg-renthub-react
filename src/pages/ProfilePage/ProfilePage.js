import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from "../../components/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";

import { useTelegram } from "../../hooks/useTelegram";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useUsersContext } from "../../contexts/UserContext";
import {useProjects} from "../../hooks/useProjects"
import './ProfilePage.css';

import RangeSlider from '../../components/UI/RangeSlider/RangeSlider';

import NewSelect5 from '../../components/UI/NewSelect5/NewSelect5';
import specData from "../../data/specData"
import cityData from "../../data/cityData"
import specPriceData from "../../data/specPriceData"

import btnSave from "../../img/buttons/btn_add.png"

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Plus from "../../img/new/button_plus.png"
import BlackFon from "../../img/new/fon_grad.svg";
import DohodOpen from "../../img/new/dohodOpen.png";
import Star from "../../img/new/star.png";
import StarActive from "../../img/new/star_activ.svg";
import Edit from "../../img/new/edit.svg"
import Edit2 from "../../img/new/edit2.svg"
import Vector from "../../img/new/vector.svg"
import VectorUp from "../../img/new/vector_up.svg"
import Workhub from "../../img/new/WorkHub.gif"
import Renthub from "../../img/new/renthub.png"
import QRCode from "../../img/new/QR_Code.svg"
import Close from "../../img/new/close.svg"
import ClosePress from "../../img/new/close_press.svg"
import Footer from "../../img/new/footer2.png"
import VK from "../../img/new/basil_vk-outline.svg"
import Phone from "../../img/new/ph_phone-call.svg"
import Web from "../../img/new/dashicons_admin-site-alt3.svg"
import Telegram from "../../img/new/telegram-computer.png"
import AddDistrib from "../../img/new/plus_small.svg"
import ULEYLogo from "../../img/new/uley.svg"
import uploadImg from "./../../img/new/iconUpload.png";

import MyModal from "../../components/MyModal/MyModal";
import Loader from "../../components/UI/Loader/Loader";
import Loader2 from "../../components/UI/Loader_min/Loader_min"
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";

import { getManagerApi, updateManager, getSpecStavka, sendManagerAvatar, uploadFile } from '../../http/projectAPI';
import WorkerList2 from '../../components/WorkerList2/WorkerList2';


const ProfilePage = () => {
    const {tg, user, queryId} = useTelegram();
    const navigate = useNavigate();
    const { hash } = useLocation();

    const projectsRef = useRef(null)

    const { projects, setProjects, specId, setSpecId, flag, summa, setSumma } = useUsersContext();
    const { workerhub, setWorkerhub, companyManager, companyProfile, distrib, 
        setDistrib, distribs, setDistribs, distrib2, setDistrib2, distribs2, setDistribs2 } = useUsersContext();
    //специалисты
    const [workerhublist, setWorkerhublist] = useState([]);

    //const [managerId, setManagerId] = useState('')
    const [projects2, setProjects2] = useState([])

    const [statusMoney, setStatusMoney] = useState('Фактически')

    const [status, setStatus] = useState([{title: "Новые"}, {title: "Старые"}, {title: "Все"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    //const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, workerId); //specId '1408579113'
    const [sortProject, setSortProject] = useState([])

    const [showArroy, setShowArroy] = useState(true)

    const [showModalEtap, setShowModalEtap] = useState(false);
    const [stavkaPlus, setStavkaPlus] = useState(0);

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [headerName, setHeaderName] = useState('Мой профиль');
    //const [scrollTop, setScrollTop] = useState(0);
    const { height, width } = useWindowDimensions();
    const [isLoadingSum, setIsLoadingSum] = useState(true);

    const [showMoreInfo, setShowMoreInfo] = useState(false)
    const [showHistory, setShowHistory] = useState(false);
    const [showKompet, setShowKompet] = useState(false);
    const [showDohod, setShowDohod] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showAddSpec, setShowAddSpec] = useState(false)
    const [showAddCity, setShowAddCity] = useState(false)
    const [showListCategoty, setShowListCategoty] = useState(false)
    const [showListRegion, setShowListRegion] = useState(false)
    const [showList, setShowList] = useState(false)
    const [showRazrab, setShowRazrab] = useState(false)
    const [price, setPrice] = useState('')
    const [showInfoMoney, setShowInfoMoney] = useState(false)

    const [showUploadLogo, setShowUploadLogo] = useState(false)
    const [showSaveLogo, setShowSaveLogo] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const [showDelCat, setShowDelCat] = useState(false)

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    //регион
    const [regions, setRegions] = useState([]);

    const [categoriesPrice, setCategoriesPrice] = useState([]);

    //select
    const [selectedElement, setSelectedElement] = useState("")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [titleCat, setTitleCat] = useState(false)
    const [titleSpec, setTitleSpec] = useState(false)

    const [titleReg, setTitleReg] = useState(false)

    //const {worker, setWorker, workers, setWorkers} = useUsersContext();
    const [showSpec, setShowSpec] = useState(false) 
    
    const [showInfoProj, setShowInfoProj] = useState(false)

    const [soundTable, setSoundTable] = useState([]);

    const [delCat, setDelCat] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [image, setImage]= useState("");

    const API_URL = process.env.REACT_APP_API_URL
    const API_URL_HOST = process.env.REACT_APP_HOST

    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже   
    useEffect(() => {

        const fetchData = async() => { 
            setIsProfileLoading(true)
            // const manager = await getManagerIdApi(user?.id)
            console.log("manager profile: ", companyProfile) 

            // setManagerId(manager?.id)

            if (projects.length > 0) {
                setProjects2(projects)
                setIsPostsLoading(false) 
            }

            setTimeout(()=> {      
                setIsProfileLoading(false)
            }, 2000)
        }

        fetchData()   
    }, [projects]);


    useEffect(() => {
        // устанавливаем категории
        if (specData.length > 0 && specData) {
            setCategories(specData);
        }

        //console.log("specPriceData: ", specPriceData.length)
        if (specPriceData.length > 0 && specPriceData) {
            setCategoriesPrice(specPriceData);
        }

        // устанавливаем регион
        if (cityData.length > 0 && cityData) {
            setRegions(cityData);
        }
        
    }, []);

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        //const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);
        const categoryId = e.target.value //parseInt(e.target.value);
        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories.find(item => item.id === categoryId);
        const catSelect = category.name; //capitalizeFirst(category.name);
        const iconCatSelect = category.icon;

        //setWorker({...worker, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        const models = category.models && category.models.length > 0
            ? category.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

            setDistrib({...distrib, cat: catSelect, icon: iconCatSelect})

        // меняем модели во втором списке
        setModels(models);

        setDisabled(false)
        setDisabledBtn(false)
        setTitleSpec("")
    }


    // 2. при выборе нового значения в регионе
    const onRegionsSelectChange = (e) => {

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        //const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);
        const categoryId = e.target.value //parseInt(e.target.value);
        // получаем из массива категорий объект категории по соответствующему идентификатору
        const region = regions.find(item => item.id === categoryId);
        const regSelect = region.name; //capitalizeFirst(category.name);
        const iconRegSelect = region.icon;

        //setWorker({...worker, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        const models = region.models && region.models.length > 0
            ? region.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

            setDistrib2({...distrib2, cat: regSelect, icon: iconRegSelect})

        // меняем модели во втором списке
        setModels(models);

        setDisabled(false)
        setDisabledBtn(false)
        setTitleSpec("")
    }

//---------------------------------------------------------------------
//1  загружаем проекты


useEffect(()=>{
    console.log("distribs: ", distribs)
    console.log("distrib: ", distrib)
    
}, [distrib, distribs])


useEffect(() => {
    const getImage = async () => {
        if (selectedFile) {
          console.log("file:", selectedFile)
          const data = new FormData();
          data.append("name", selectedName);
          data.append("photo", selectedFile);
          
          let response = await uploadFile(data);
          console.log("response: ", response.data.path)

          setImage(API_URL_HOST + response.data.path.split('.team')[1]);
          //сообщение с ссылкой на файл
          console.log(API_URL_HOST + response.data.path.split('.team')[1])
          //setValue(host + response.data.path)
        }
    }
    getImage();
}, [selectedFile])

useEffect(() => {
    console.log("image: ", image)
}, [image])

{/* Добавление файла */}
const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
    // Additional validation logic
};


//---------------------------------------------------------------------
    //отправка данных в telegram-бот

//---------------------------------------------------------------------
    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    const onClose = () => {
        tg.close()
    }

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])


    useEffect(() => {
        tg.MainButton.show();
    }, [])


    const clickWorkhub = () => {
        showFooter ? setShowFooter(false) : setShowFooter(true)
    }

    useEffect(() => {
        // if (workers.length > 0) {
        //     tg.onEvent('mainButtonClicked', onSendData)
        //     return () => {
        //         tg.offEvent('mainButtonClicked', onSendData)
        //     } 
        // } else {
            tg.onEvent('mainButtonClicked', clickWorkhub)
            return () => {
                tg.offEvent('mainButtonClicked', clickWorkhub)
            }
        //}
    }, [clickWorkhub])

    useEffect(() => {
        // if (distribs.length > 0) {
        //     tg.MainButton.setParams({
        //         text: 'Сохранить',
        //         color: '#000000' //'#2e2e2e'
        //     })
        // } else {
            tg.MainButton.setParams({
                text: 'Renthub',
                color: '#26292c' //'#2e2e2e'
            })
        //}
        
    }, [])



    useEffect(() => {
        if (distribs.length > 0) {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            } 
        } else {
            tg.onEvent('mainButtonClicked', clickWorkhub)
            return () => {
                tg.offEvent('mainButtonClicked', clickWorkhub)
            }
        }
    }, [distribs, clickWorkhub])

    //отправка данных в telegram-бот
    const onSendData = useCallback(async() => {

        const data = {
            worklist: workers, 
            user,
            queryId,
        }

        let worklist = []
        distribs.map(item=> {
            worklist.push({cat: item?.cat})
        })

        const saveData = {
            worklist: JSON.stringify(worklist)
        }

        console.log("save data: ", saveData, workerhub?.chatId)
        
        const resUpdate = await updateManager(workerhub?.id, saveData)
        console.log("resUpdate: ", resUpdate)

        tg.MainButton.hide();

        // fetch(API_URL + 'web-addspec', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
              
    }, [ distribs, user ])   

//---------------------------------------------------------------------------------------
    
    const onAddProject = () => {
        navigate('/add-project')
    }


    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const showPopup = () => {   
        setModal(true)
        //setTimeout(()=> {
            openInNewTab('tel:+74995001411')
        //}, 2000)

        setTimeout(()=> {
            setModal(false)       
        }, 6000)
    }

    const clickAddSpec = (e) => {
        e.stopPropagation();
        setShowAddSpec(true) 
        setShowSpec(true)
    }

    const addNewDistrib = async(e) => {
        e.preventDefault();
        //setShowAddSpec(false) 

        //console.log("distribs2: ", distribs)

        if (distrib.cat !== '' || distrib.spec !== '') {
            setDistribs([...distribs, {...distrib, id: Date.now()}])
        }

        setDistrib({cat: '', spec: '', icon: ''})
        setSelectedElement("");
        setTitleCat(false)

        

        setShowSpec(true)

        setShowSaveButton(true)
        
    }

    const saveNewDistrib = async(e) => {
        e.preventDefault();
        setShowAddSpec(false) 

        let worklist = []
        distribs.map(item=> {
            worklist.push({cat: item?.cat})
        })

        const saveData = {
            worklist: JSON.stringify(worklist)
        }

        console.log("save data: ", saveData, workerhub?.chatId)
        
        const resUpdate = await updateManager(workerhub?.id, saveData)
        console.log("resUpdate: ", resUpdate)   
    }

    const onClickClose = () => {
        setShowAddSpec(false)
    }


    const clickAddCity = (e) => {
        e.stopPropagation();
        //setShowAddCity(true) 
        setShowRazrab(true)
    }

    const addNewDistrib2 = async(e) => {
        e.preventDefault();
        setShowAddCity(false) 

        if (distrib2.cat !== '' || distrib2.spec !== '') {
            setDistribs2([...distribs2, {...distrib2, id: Date.now()}])
        }


        // const saveDate = [{name: distribs?.cat}]

        // console.log("save data: ", saveDate, workerhub?.chatId)
        
        // const resUpdate = await updateManager(workerhub?.id, JSON.stringify(saveDate))
        // console.log("resUpdate: ", resUpdate)
        
    }

    const onClickClose2 = () => {
        setShowAddCity(false)
    }

    const onClickCloseList = () => {
        setShowListCategoty(false)
    }

    const onClickCloseList2 = () => {
        setShowListRegion(false)
    }

    const clickDistrib = () => {
        setShowListCategoty(true)
    }

    const clickDistrib2 = () => {
        setShowListRegion(true)
    }


    const clickKompeten = () => {
        showKompet ? setShowKompet(false) : setShowKompet(true)
    }


    const fetchStavka = async(data) => {

        const res = await getSpecStavka(data)

        //console.log("res: ", res)

        let arrSpec = []
        Object.keys(res).map((item, index)=> {
            const obj = {
                title: item,
                smena: Object.keys(res[item])[0],
                stavka: res[item][Object.keys(res[item])[0]]["№1"]
            }
            arrSpec.push(obj)

            if (item === 'Помощник / Грузчик') {
                const obj2 = {
                    title: item,
                    smena: Object.keys(res[item])[1],
                    stavka: res[item][Object.keys(res[item])[1]]["№1"]
                }
                arrSpec.push(obj2)

                const obj3 = {
                    title: item,
                    smena: Object.keys(res[item])[2],
                    stavka: res[item][Object.keys(res[item])[2]]["№1"]
                }
                arrSpec.push(obj3)
            }
            
        })

        setSoundTable(arrSpec)
    }

    const clickPrice = (name) => {
        setShowList(true)

        switch(name) {
            case 'Звук':  // if (x === 'value1')
                setPrice('Специалисты по звуку');

                const data = {
                    "names": [
                        "Звукорежиссер",
                        "Системный инженер",
                        "RF-Менеджер",
                        "Backline",
                        "Roadie",
                        "Техник по звуку",
                        "Микрофонный техник"
                    ]
                }
        
                fetchStavka(data)
                break;
          
            case 'Свет':  // if (x === 'value2')
                setPrice('Специалисты по свету');
                const data2 = {
                    "names": [
                        "Художник по свету",
                        "Оператор световой пушки",
                        "Гафер",
                        "Техник по свету",
                        "Электрик",
                    ]
                }
        
                fetchStavka(data2)
                break;

            case 'Видео':  // if (x === 'value2')
                setPrice('Видеоинженеры');
                const data3 = {
                    "names": [
                        "Инженер VMix",
                        "Инженер Resolume",
                        "Оператор",
                        "Оператор Zoom-конференций",
                        "Оператор Action-съемки",
                        "Режиссер эфиров",
                        "Техник по монтажу экранов",
                    ]
                }
        
                fetchStavka(data3)
                break;
            
            case 'Фото':  // if (x === 'value2')
                setPrice('Фотографы');
                const data4 = {
                    "names": [
                        "Портретная съемка",
                        "Предметная съемка",
                        "Документальная съемка",
                        "Репортажная съемка",
                        "Свадебная съемка",
                    ]
                }
        
                fetchStavka(data4)
                break;

            case 'Кино / Театр':  // if (x === 'value2')
                setPrice('Кино / Театр');
                const data13 = {
                    "names": [
                        "Режиссер",
                        "Оператор-постановщик",
                        "Стедикам",
                        "Оператор крана",
                        "Оператор Action-съемки",
                        "Гафер",
                        "Актер",
                        "Гример",
                        "Костюмер",
                    ]
                }
        
                fetchStavka(data13)
                break;

            case 'Промо':  // if (x === 'value2')
                setPrice('Специалисты');
                const data5 = {
                    "names": [                       
                        "Промоутер",
                        "Визажист",
                        "Костюмер",
                        "Модель",
                    ]
                }
        
                fetchStavka(data5)
                break;

            case 'Кейтеринг':  // if (x === 'value2')
                setPrice('Кейтеринг');
                const data6 = {
                    "names": [
                        "Официант",
                        "Бармен",
                        "Повар",
                        "Хостес",
                        "Банкетный менеджер",
                    ]
                }
        
                fetchStavka(data6)
                break;
                
            case 'Помощники':  // if (x === 'value2')
                setPrice('Отдел силы и помощи');
                const data7 = {
                    "names": [
                        "Помощник / Грузчик",
                        "Помощник / Грузчик",
                        "Помощник / Грузчик",
                    ]
                }
        
                fetchStavka(data7)
                break;

            case 'Риггеры \/ Сцена':  // if (x === 'value2')
                setPrice('Конструктив сцены и альпинисты');
                const data8 = {
                    "names": [
                        "Верхний Риггер",
                        "Нижний Риггер",
                        "Монтаж конструктива сцены",
                        "Монтаж шатров",
                    ]
                }
        
                fetchStavka(data8)
                break;

            case 'Грузоперевозки':  // if (x === 'value2')
                setPrice('Грузоперевозки');
                const data9 = {
                    "names": [
                        "Мотокурьер",
                        "C личным ТС [B\/C]",
                        "Без личного ТС [B\/C]",
                        "С гидролифтом",
                        "Без гидролифта",
                    ]
                }
        
                fetchStavka(data9)
                break;

            case 'Артисты':  // if (x === 'value2')
                setPrice('Артисты');
                const data10 = {
                    "names": [
                        "Кавер-бенд",
                        "Танцевальный коллектив",
                        "Диджей",
                        "Ведущий",
                        "Певец \/ певица",
                        "Артист оригинального жанра",
                        "Go-Go",
                        "Фаир-шоу",
                    ]
                }
        
                fetchStavka(data10)
                break;

            case 'Игры':  // if (x === 'value2')
                setPrice('Игры');
                const data11 = {
                    "names": [
                        "Квест",
                        "Квиз",
                        "Аниматор",
                        "Настольные игры \/ игровые автоматы",
                        "Пневмокостюм \/ ростовая кукла",
                        "Активности \/ аттракционы",
                    ]
                }
        
                fetchStavka(data11)
                break;

            case 'Продакшн':  // if (x === 'value2')
                setPrice('Продакшн');
                const data12 = {
                    "names": [
                        "Мероприятие под ключ",
                        "Отдельные технические задачи",
                        "Event-менеджер",
                    ]
                }
        
                fetchStavka(data12)
                break;

            case 'Декорации':  // if (x === 'value2')
                setPrice('Декорации');
                const data14 = {
                    "names": [
                        "Декоратор",
                        "Флорист оформитель",
                        "Монтаж мебели",
                        "Монтаж выставочных стендов",
                        "Напольные покрытия",
                    ]
                }
        
                fetchStavka(data14)
                break;
          
            default:
                setPrice('Специалисты');
                break;
          }
    }

    const onClickCloseList3 = () => {
        setShowList(false)
    }

    const clickLogo = ()=> {
        setShowUploadLogo(true)
    }


    const clickShkala = () => {
        showModalEtap ? setShowModalEtap(false) : setShowModalEtap(true)
    }

    const clickInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
        // setTimeout(()=> {
        //     setShowInfo(false)
        // }, 1500)
    }



    const delDistrib = async()=> {
        //e.preventDefault();
        console.log("Подтверждено: ", delCat)

        setShowDelCat(false)

        const res = [...distribs].filter((item, index)=> item.id !== delCat)
        setDistribs(res)

        let worklist = []
        res.map(item=> {
            worklist.push({cat: item?.cat})
        })

        const saveData = {
            worklist: JSON.stringify(worklist)
        }

        console.log("save data: ", saveData, workerhub?.chatId)
        
        const resUpdate = await updateManager(workerhub?.id, saveData)
        console.log("resUpdate: ", resUpdate)  
    }

    const clickDel = (id)=> {
        console.log("id: ", id)
        setShowDelCat(true)
        setDelCat(id)
    }


    

    const clickShowInfoProj = () => {
        //e.stopPropagation();
        setShowInfoProj(true)
    }

    const clickUpload = async() => {
        setShowSaveLogo(true)
        const data = {
            avatar: image,
        }
        const res = await sendManagerAvatar(user?.id, data)
        // console.log("res upload: ", res)
        setShowUploadLogo(false)
    }

//---------------------------------------------------------------------------------------

    return (
        <div className="App" style={{overflowX: 'hidden'}}>

            <Header header={{title: `${headerName}`, icon: 'false', menu: `${Renthub}`}} setShowModal={setShowMoreInfo} showModal={showMoreInfo}/>

            {/* темный фон */}
            {/* <img src={BlackFon} alt='' className='fon-black' /> */}
            <div style={{height: '844px', background: 'linear-gradient(180deg, #343A41 0%, #222325 100%)'}} className='fon-black' />

            {isProfileLoading
            ? <div style={{width: '100vw', display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}><Loader/></div>
            :<>
            <div className="container">
                {/* ФИО */}
                <article className="card">
                    <div className="rectangle4">
                    </div>
                    <div className="circle">
                        {!companyProfile ?
                        <div onClick={clickLogo}>
                            <img src={ULEYLogo} style={{width: '85px', marginTop: '50px', marginRight: '2px'}} alt='' />
                            <p style={{fontSize: '7px', padding: '3px 25px', color: '#ada7a7'}}>Здесь будет лого вашей компании</p>
                        </div>
                        : <div onClick={clickLogo}>
                            <img src={companyProfile} style={{width: '124px', borderRadius: '50%', marginTop: '2px', marginRight: '2px'}} alt='' />
                          </div>
                        }
                    </div>
                    <div>
                        <p className="profile_fio">{(workerhub?.fio.split(' ')[0] + ' ' + workerhub?.fio.split(' ')[1]).replace(/\[.+\]/,'')}</p>

                        <p className="profile_city">{companyManager ? companyManager.replace(/\[.+\]/,'') : '-'}</p>
                        <p className="profile_company">{workerhub?.city}</p>
                        {/* <div className="card-specs bullet">
                            <ul>
                                <li className="bullet-title" style={{color: '#3392ff', fontWeight: 'bold'}}>Добавь свою специальность</li> 
                            </ul>   
                        </div>      */}
                    </div>
                    
                    <div className="star-block">
                        
                    </div>
                    <div className='block-id'> ID {workerhub?.chatId}</div>
                </article>

                <div style={{display: 'flex', marginTop: '40px', justifyContent: 'space-between'}}>
                
                    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', flex: '0 0 56%'}}>

                        {/* Цена услуги */}
                        <article className='block-kompetencii' style={{display: !showKompet ? 'block' : 'none'}}> 
                            <div className='rectangle5'></div>
                            <div className='kompetencii-title' onClick={clickKompeten}>
                                <p className='text-kompetencii'>Цена услуги</p>
                                <img className='vector-icon' src={Vector} alt=''/>
                            </div>
                        </article>

                        {/* open */}
                        <article className='block-kompetencii-open' style={{display: showKompet ? 'block' : 'none'}}> 
                            <div className='rectangle-kompeten'></div>
                            <div className='rectangle-kompeten2'></div>
                            <div className='rectangle-kompeten3'></div>
                            <div className='kompetencii-title' onClick={clickKompeten}>
                                <p className='text-kompetencii' >Цена услуги</p>
                                <img className='vector-icon' src={VectorUp} alt=''/>
                            </div>
                            <div className='kompet-list'>
                                <ul style={{listStyle: 'disc'}}>
                                    {categoriesPrice.map((item, index) => index < 15
                                    ?   <li key={item.id} className="bullet-title" style={{ whiteSpace: 'nowrap'}} onClick={()=>clickPrice(item.name)}><span style={{fontSize: '20px'}}>• </span>{item.name} </li>
                                    : '' )}
                                </ul>  
                            </div>
                        </article>    

                        {/* Доход */}
                       <article className='block-dohod' onClick={()=>setShowInfoMoney(true)} style={{display: showKompet ? 'none' : 'block'}}> 
                            <div className='rectangle17'></div>
                            <div className='kompetencii-title' style={{top: '40px'}}><p>Сумма к выплате</p></div>
                            <p className='summa-dohod'>{2>1 ? '0.00' : <Loader2 />}</p>
                        </article>

                    </div> 

                    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', flex: '0 0 40%'}}>
                        {/* Рассылка */}
                        <article className='block-merch'> 
                                <div className='rectangle5'></div>

                                <div className={`${distribs.length > 0 ? 'rectangle-circle2' : 'rectangle-circle'}`}>
                                    {/* <div className='rectangle-circle-on'></div> */}
                                </div>

                                <p className='merch-title'>Рассылка</p>
                                {/* Категории */}
                                <div className='perechislenie' onClick={clickDistrib}>
                                    <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                        <img src={AddDistrib} onClick={clickAddSpec} alt='' width={40} />
                                        <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                            <p style={{color: '#bbbbbb', fontSize: '14px'}}>Категория</p>
                                            {/* <p style={{fontSize: '9px', color: '#a79f9f'}}>Выбранная отрасль</p>  */}
                                        </div>   
                                    </div>  
                                </div>

                                {/* Локация */}
                                <div className='perechislenie' onClick={clickDistrib2} style={{top: '90px'}}>
                                    <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                        <img src={AddDistrib} onClick={clickAddCity}  alt='' width={40} />
                                        <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                            <p style={{color: '#DBDBDB', fontSize: '14px'}}>Регион</p>
                                            {/* <p style={{fontSize: '9px', color: '#a79f9f'}}>Выбранные регион/город</p>  */}
                                        </div>   
                                    </div> 
                                    {/* <ul style={{fontSize: '11px', width: '100%', listStyle: 'disc'}}>
                                        {distribs2 ? distribs2.map((item, index)=> (
                                            <li key={index} style={{margin: '0', marginLeft: '40px', marginTop: '-5px', color: '#6c6b6b'}}>{item.cat}</li>   
                                        ))
                                        : ''    
                                        }    
                                    </ul>  */}
                                </div>
                                
                        </article>

                        {/* Компания */}
                        <article className='block-kompetencii' style={{display: 'block', marginTop: '10px'}} onClick={()=>setShowRazrab(true)}> 
                            <div className='rectangle5'></div>
                            <div className='kompetencii-title'>
                                <p className='text-kompetencii'>Компания</p>
                                <img className='vector-icon' src={Vector} alt=''/>
                            </div>
                        </article>
                    </div>

                    
                    
                </div>

                <article onClick={onAddProject} className="card" style={{height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px'}}>
                    <div className='rectangle5'></div>   
                    <div className='show-border'></div>   
                    <p style={{zIndex: '10'}}>Новый проект</p>  
                </article> 
                
            </div>


            <div  ref={projectsRef}>

                <div className="profile-project-list">   
                    <Header 
                        header={{title: `Мои проекты`, icon: 'true', menu: 'меню'}}
                        filter={filter}
                        setFilter={setFilter}
                    />


                    {isPostsLoading ? 
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
                        <Loader/>
                    </div>  
                    : <ProjectList posts={projects2} title=""/>
                    }
                </div> 
            </div>
            </>
            }

            <div className='footer-block' style={{display: showFooter ? 'block' : 'none'}}>
                <img onClick={onAddProject} src={Plus} alt='' width='100%' className='btn-friend' />
                <img src={Footer} alt='' width='100%' className='footer-image' />
                <div className='footer-rec'></div>
                
                <div className='footer-icons'>
                    <img onClick={()=>showPopup()} src={Phone} alt='' width='100%' className='icon-footer' />
                    <img onClick={()=>openInNewTab('https://vk.com/uley.team')} src={VK} alt='' width='100%' className='icon-footer' />  
                </div>
                <div className='footer-icons2'> 
                    <img onClick={() =>openInNewTab('https://t.me/uley_team')} src={Telegram} alt='' width='100%' className='icon-footer' /> 
                    <img onClick={()=>openInNewTab('https://uley.team/')} src={Web} alt='' width='100%' className='icon-footer' /> 
                </div>   
            </div>


            <MyModal visible={showAddSpec} setVisible={setShowAddSpec}>
                <div className='info-card' style={{height: 'auto', minHeight: '250px', justifyContent: 'flex-start'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={onClickClose} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>

                    <p className='vagno'>Настройка рассылки</p>
                    <p className='vagno' style={{marginTop: '20px', fontSize: '12px', color: '#b4b4b4', paddingRight: '15px', textAlign: 'left'}}>
                        Хочу получать рассылку по выбранной категории
                    </p>
                    <div style={{position: 'relative', marginTop: '100px', marginLeft: '25px', marginRight: '25px', marginBottom: 'auto'}}>
                        {/* <p className='cat-title' style={{display: titleCat ? 'none' : 'block'}}>Отрасль / категория</p>   */}
                        <NewSelect5
                            id="category"
                            options={categories}
                            titleCat={titleCat ? titleCat : 'Категория'}
                            setTitleCat={setTitleCat}
                            onChange={onCategoriesSelectChange}
                            heigthModal={true}
                        /> 
                    </div>

                    <div style={{position: 'relative', marginRight: '25px', marginRight: '15px', marginTop: '10px'}}>
                        {/*список категорий*/}
                        <div style={{
                            boxSizing: 'border-box', 
                            height: 'auto', 
                        }}>
                            {
                            showSpec && 
                            <div className='fio-text'>
                                <ul style={{fontSize: '14px', width: '100%', listStyle: 'disc', position: 'relative', marginTop: '10px', textAlign: 'left'}}>
                                    {distribs ? distribs.map((item, index)=> (
                                        <li key={index} style={{margin: '0', marginLeft: '40px', marginBottom: '5px', color: '#6c6b6b'}}>{item.cat}</li>   
                                    ))
                                    : ''    
                                    }    
                                </ul>
                            </div>
                            }
                        </div>  

                        {/*кнопка Добавить*/}
                        <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '15px', marginBottom: '15px'}}>
                            <button 
                                disabled={disabledBtn}
                                className="image-add-modal-button" 
                                style={{ visibility: showSaveButton ? 'visible' : 'hidden', backgroundImage: `url(${btnSave})`}}
                                onClick={saveNewDistrib}
                            >
                                Сохранить
                            </button>
                            <button 
                                disabled={disabledBtn}
                                className="image-add-modal-button" 
                                style={{ backgroundImage: `url(${btnSave})`}}
                                onClick={addNewDistrib}
                            >
                                Добавить
                            </button>
                        </div>  
                    </div>
                </div>
            </MyModal>



            <MyModal visible={showListCategoty} setVisible={setShowListCategoty}>
                <div className='info-card' style={{height: 'auto', minHeight: '250px', justifyContent: 'flex-start'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={onClickCloseList} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>

                    <p className='vagno'>Категории</p>                  

                    <ul style={{fontSize: '14px', width: '100%', listStyle: 'disc', position: 'relative', marginTop: '70px', textAlign: 'left'}}>
                        {distribs ? distribs.map((item, index)=> (
                            <li key={index} style={{margin: '0', marginLeft: '40px', marginBottom: '5px', color: '#6c6b6b', position: 'relative'}}>
                                {item.cat} 
                                <img onClick={()=>clickDel(item.id)} src={Close} alt='' style={{position: 'absolute', right: '22px', top: '3px', width: '12px'}}/>
                            </li>   
                        ))
                        : ''    
                        }    
                    </ul>
                </div>
            </MyModal>

            <MyModal visible={showDelCat} setVisible={setShowDelCat}>
                <div className='info-card' style={{height: '200px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowDelCat(false)} src={Close} alt='' style={{position: 'absolute', right: '18px', top: '18px', width: '15px'}}/>
                    <div>
                        <p className='vagno'>Предупреждение</p>
                        <p className='text-promo' style={{top: '80px'}}>Категория рассылки будет удалена!</p>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '15px', marginBottom: '15px', marginTop: '150px', marginRight: '15px'}}>
                            <button 
                                //disabled={disabledBtn}
                                className="image-add-modal-button" 
                                style={{ backgroundImage: `url(${btnSave})`}}
                                onClick={()=>setShowDelCat(false)}
                            >
                                Отмена
                            </button>
                            <button 
                                //disabled={disabledBtn}
                                className="image-add-modal-button" 
                                style={{ backgroundImage: `url(${btnSave})`}}
                                onClick={delDistrib}
                            >
                                Подтвердить
                            </button>
                    </div>  
                </div>
            </MyModal>


            <MyModal visible={showAddCity} setVisible={setShowAddCity}>
                <div className='info-card' style={{height: 'auto', minHeight: '250px', justifyContent: 'flex-start'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={onClickClose2} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>

                    <p className='vagno'>Настройка рассылки</p>
                    <p className='vagno' style={{marginTop: '20px', fontSize: '12px', color: '#b4b4b4'}}>Локация</p>
                    <div style={{position: 'relative', marginTop: '90px', marginLeft: '25px', marginRight: '25px'}}>
                        {/* <p className='cat-title' style={{display: titleCat ? 'none' : 'block'}}>Отрасль / категория</p>   */}
                        <NewSelect5
                            id="category"
                            options={regions}
                            titleCat={titleReg ? titleReg : 'Регион'}
                            setTitleCat={setTitleReg}
                            onChange={onRegionsSelectChange}
                            heigthModal={true}
                        /> 
                    </div>

                    <div style={{position: 'absolute', bottom: 0, right: '10px'}}> 

                        {/*кнопка Добавить*/}
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '15px'}}>
                            <button 
                                disabled={disabledBtn}
                                className="image-add-modal-button" 
                                style={{ backgroundImage: `url(${btnSave})`}}
                                onClick={addNewDistrib2}>
                                Подтвердить
                            </button>
                        </div>  
                    </div>
                </div>
            </MyModal>


            <MyModal visible={showListRegion} setVisible={setShowListRegion}>
                <div className='info-card' style={{height: 'auto', minHeight: '250px', justifyContent: 'flex-start'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={onClickCloseList2} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>

                    <p className='vagno'>Регион</p>
                    

                    <ul style={{fontSize: '14px', width: '100%', listStyle: 'disc', position: 'relative', marginTop: '70px', textAlign: 'left'}}>
                        {distribs2 ? distribs2.map((item, index)=> (
                            <li key={index} style={{margin: '0', marginLeft: '40px', marginBottom: '5px', color: '#6c6b6b'}}>{item.reg}</li>   
                        ))
                        : ''    
                        }    
                    </ul>
                </div>
            </MyModal>

             {/* Прайс цен на услуги специалиста */}       
            <MyModal visible={showList} setVisible={setShowList}>
                <div className='info-card' style={{height: '480px', minHeight: '250px', justifyContent: 'flex-start', width: '340px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    {/* <img onClick={onClickCloseList3} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/> */}

                    <p className='vagno'>{price}</p>
                    
                    <table style={{fontSize: '13px', color: 'rgb(219 219 219 / 41%)', borderCollapse: 'collapse', border: 'none', position: 'relative', marginTop: '50px'}}>
                        <tr>
                            <th style={{textAlign: 'left', paddingLeft: '15px', width: '220px'}}>Специальность</th>
                            <th style={{width: '40px'}}>Часы</th>
                            <th>Ставка</th>
                        </tr>
                        {
                        soundTable && soundTable.map((item, index)=> (
                            <tr key={index}>
                                <td style={{textAlign: 'left', paddingLeft: '15px'}}>{item.title.length > 22 ? item.title.slice(0,22) + '...' : item.title }</td>
                                <td>{item.smena}</td>
                                <td>{parseInt(item.stavka).toLocaleString()}</td>
                            </tr>
                        ))
                        }                    
                    </table>

                    <div style={{position: 'absolute', bottom: '25px'}}>
                        <p>Внимание!</p>
                        <p style={{fontSize: '13px', color: 'rgb(219 219 219 / 41%)', paddingLeft: '15px', paddingRight: '15px'}}>
                            Здесь отображена актуальная «средняя» ставка по рынку. Ставка часто зависит от множества факторов и вы всегда можете предложить свою «адекватную» цену за конкретный проект. 
                        </p>
                        <p style={{marginTop: '20px'}}>Важно помнить!</p>
                        <p style={{fontSize: '13px', color: 'rgb(219 219 219 / 41%)'}}>
                            Понижение ставки отрицательно влияет на конверсию и качество потенциальных кандидатов.</p>
                    </div>

                    {/* <ul style={{fontSize: '14px', width: '100%', listStyle: 'disc', position: 'relative', marginTop: '70px', textAlign: 'left'}}>
                        {distribs2 ? distribs2.map((item, index)=> (
                            <li key={index} style={{margin: '0', marginLeft: '40px', marginBottom: '5px', color: '#6c6b6b'}}>{item.reg}</li>   
                        ))
                        : ''    
                        }    
                    </ul> */}
                </div>
            </MyModal>


            <MyModal visible={showRazrab} setVisible={setShowRazrab}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    {/* <p className='vagno'>Важно</p> */}
                    <p className='text-vagno'>Функция находится в разработке</p>
                    <div className='button-ok' onClick={()=>setShowRazrab(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>

            <MyModal visible={showInfoMoney} setVisible={setShowInfoMoney}>
                <div className='info-card' style={{height: 'auto', minHeight: '250px', justifyContent: 'flex-start'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowInfoMoney(false)} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>

                    <p className='vagno'>Информация</p>
                    
                    <div className='button-ok' onClick={()=>setShowInfoMoney(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>

            <MyModal visible={showUploadLogo} setVisible={setShowUploadLogo}>
                <div className='info-card' style={{padding: '0 15px', height: 'auto', minHeight: '250px', justifyContent: 'flex-start'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowUploadLogo(false)} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>

                    <p className='vagno'>Загрузка логотипа</p>

                    {/* Фото  */}
                    <div style={{position: 'relative', marginTop: '90px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <div className="file-upload">
                            <p>{selectedName || "Логотип"}</p><img src={uploadImg} alt="upload" width={30} height={30} />
                            <input
                                className='input-style3'
                                type="file" 
                                name="photo" 
                                onChange={handleFileChange}
                            /> 
                        </div> 
                    </div>  
                    
                    <div className='button-ok' onClick={clickUpload}>
                        <div className='rec-button'>Отправить</div>
                        
                    </div>
                </div>
            </MyModal>

            <MyModal visible={showSaveLogo} setVisible={setShowSaveLogo}>
                <div className='info-card' style={{height: '200px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowSaveLogo(false)} src={Close} alt='' style={{position: 'absolute', right: '18px', top: '18px', width: '15px'}}/>

                    {/* <p className='vagno'>Информация</p> */}
                    <p className='text-promo'>Файл отправлен.</p>
                    <p className='text-promo' style={{top: '60px'}}>После обработки логотип вашей компании будет обновлен в профиле.</p>
                    <p className='text-promo' style={{top: '120px'}}>Спасибо за вашу активность.</p>

                    <div className='button-ok' onClick={()=>setShowSaveLogo(false)}>
                        <div className='rec-button'>Хорошо</div>         
                    </div>
                </div>
            </MyModal>


            <MyModal visible={showModalEtap} setVisible={setShowModalEtap}>
                <div className='modal-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    {/* <img src={Question} alt='' style={{position: 'absolute', top: '20px', left: '20px'}}/> */}
                    <div className='block-close' onClick={()=>setShowModalEtap(false)}>
                    <img src={Close} alt=''/> 
                    </div>

                    <p style={{position: 'absolute', width: '100%', top: '45px'}}>
                        Этапы передвижения ваших средств
                    </p>

                    <div className='block-text'>
                        <ul className='text-modal-list'>
                            <li>01. Предварительно</li>
                            <li>02. Фактически</li>
                            <li>03. Подтверждено</li>
                            <li>04. В процессе [на оплате]</li>
                            <li>05. Оплачено</li>
                        </ul>
                    </div>
                </div>
                {/* <img src={BackModal} alt=''/> */}
            </MyModal>

            <MyModal visible={showInfo} setVisible={setShowInfo}>
                    <div className='info-card'>
                        <div className='rectangle-modal'></div>
                        <div className='rectangle-modal2'></div>
                        <div className='rectangle-modal3'></div>

                        {/* <p className='vagno'>Важно</p> */}
                        <p className='text-vagno'>Функция находится в разработке</p>
                        <div className='button-ok' onClick={()=>setShowInfo(false)}>
                            <div className='rec-button'>Хорошо</div>
                            
                        </div>
                    </div>
            </MyModal>

            <MyModal visible={showInfoProj} setVisible={setShowInfoProj}>
                <div className='info-card' style={{height: '200px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowInfoProj(false)} src={Close} alt='' style={{position: 'absolute', right: '18px', top: '18px', width: '15px'}}/>

                    <p className='vagno'>Информация</p>
                    <p className='text-promo'></p>
                    {/* <div className='button-more' onClick={()=>setShowInfoProj(false)}>
                        <div className='rec-button'>Подробнее</div>         
                    </div> */}
                    <div className='button-ok' onClick={()=>setShowInfoProj(false)}>
                        <div className='rec-button'>Хорошо</div>         
                    </div>
                </div>
            </MyModal>
            
        </div>
    );
};


export default ProfilePage;