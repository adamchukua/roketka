import Home from './components/Home';
import Catalog from './components/Catalog';
import Product from './components/Product';
import Admin from './components/Admin';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/catalog',
        element: <Catalog />
    },
    {
        path: '/product/:id',
        element: <Product />
    },
    {
        path: '/admin',
        element: <Admin />
    }
];

export default AppRoutes;
