import Home from './components/Home';
import Catalog from './components/Catalog';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/catalog',
        element: <Catalog />
    }
];

export default AppRoutes;
