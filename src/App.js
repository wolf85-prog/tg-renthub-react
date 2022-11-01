import './style/App.css';
import {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProjectList from "./components/ProjectList/ProjectList";
import Form from "./components/Form/Form";
import AddProject from "./components/AddProject";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'Description'},
        {id: 2, title: 'JavaScript 2', body: 'Description'},
        {id: 3, title: 'JavaScript 3', body: 'Description'},
    ])

    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProjectList posts={posts} title="Список проектов 1"/>}/>
                <Route path={'form'} element={<Form />}/>
                <Route path={'add-project'} element={<AddProject />}/>
            </Routes>


        </div>
    );
}

export default App;
