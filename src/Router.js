import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Home';
export const routerConfig = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/home',
        element: <Home />
    }
])