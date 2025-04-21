import './style/App.css';
import {Route, Routes} from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Load from "./pages/Load/Load";
import Error from "./pages/Error/Error";
import Posts from "./pages/Posts/Posts";
import NewProject from "./pages/NewProject/NewProject";
import NewStavka from "./pages/NewStavka/NewStavka";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import Reytings from "./pages/Reytings/Reytings";
import EditReyting from "./pages/EditReyting/EditReyting";

function App() { 

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Routes>
                    <Route index element={<Load />}/>
                    <Route path={'posts'} element={<Posts />}/>
                    <Route path={'profile'} element={<ProfilePage />}/>
                    <Route path={'error'} element={<Error />}/>
                    <Route path={'add-project'} element={<NewProject />}/>
                    <Route path={'add-stavka/:id'} element={<NewStavka />}/>
                    <Route path={'list-reyting'} element={<Reytings />}/>
                    <Route path={'edit-reyting'} element={<EditReyting />}/>
                </Routes>
        </ThemeProvider>
    );
}

export default App;
