import './style/App.css';
import {Route, Routes} from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Load from "./pages/Load/Load";
import Posts from "./pages/Posts/Posts";
import NewProject from "./pages/NewProject/NewProject";

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
                    <Route path={'add-project'} element={<NewProject />}/>
                </Routes>
        </ThemeProvider>
    );
}

export default App;
