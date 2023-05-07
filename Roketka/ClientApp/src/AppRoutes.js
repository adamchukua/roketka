import Home from './components/Home';
import Catalog from './components/Catalog';
import Product from './components/Product';

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
    }
];

export default AppRoutes;
