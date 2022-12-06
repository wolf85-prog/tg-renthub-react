import './style/App.css';
import {Route, Routes} from 'react-router-dom'
import Posts from "./pages/Posts/Posts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
            <div className="App">
                <Routes>
                    <Route index element={<Posts />}/>
                    <Route path={'add-project'} element={<NewProject />}/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
