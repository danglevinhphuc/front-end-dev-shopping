import React from 'react';
import HomePage from './components/HomePage/components/HomePage';
import SignUp from './components/HomePage/components/SignUp';
import NotFoundPage from './components/NotFound/NotFoundPage';
import DashboardPage from './components/Dashboard/components/DashboardPage'
import ProductListPage from './components/ProductListPage/components/ProductListPage';
import ProductsItemPage from './components/ProductListPage/components/ProductItemPage';
import UserPage from './components/User/components/UserPage';
import EditUserPage from './components/User/components/EditUserPage';
import ProductTypeListPage from './components/ProductTypePage/components/ProductTypeListPage';
import ProductTypeItemPage from './components/ProductTypePage/components/ProductTypeItemPage';
import ImportPage from './components/ProductTypePage/components/ImportPage'
import VerifyPage from './components/HomePage/components/VerifyPage'
import AcitveOTPPage from './components/HomePage/components/AcitveOTPPage'
import ForgotPage from './components/HomePage/components/ForgotPass'
import ChatPage from './components/Chat/components/ChatPage'
import AccessTokenPage from './components/HomePage/components/AccessToken'
import ConfigMenuListPage from './components/ConfigMenu/components/ConfigMenuListPage'
import ConfigMenuEditPage from './components/ConfigMenu/components/ConfigMenuEditPage'
import HistoryPage from './components/History/components/HistoryPage'
import ConfigIconHeaderListPage from './components/ConfigIconHeader/components/ConfigIconHeaderListPage'
import ConfigIconHeaderEditPage from './components/ConfigIconHeader/components/ConfigIconHeaderEditPage'
const routes = [
    {
        path: '/sign-in',
        exact: true,
        main: ({  history }) => <HomePage  history={history} />
    },
    {
        path: '/sign-up',
        exact: true,
        main: ({  history }) => <SignUp  history={history} />
    },
    {
        path: '/',
        exact: true,
        main: ({  history }) => <DashboardPage history={history} />
    },
    {
        path: '/dashboard',
        exact: true,
        main: ({  history }) => <DashboardPage history={history} />
    },
    {
        path: '/product-manager',
        exact: true,
        main: () => <ProductListPage />
    },
    {
        path: '/product-manager/edit/:id?',
        exact: true,
        main:  ({ match, history }) => <ProductsItemPage match={match} history={history} />
    },
    {
        path: '/user-info',
        exact: false,
        main: () => <UserPage />
    },
    {
        path: '/user/edit',
        exact: false,
        main:  ({  history }) => <EditUserPage history={history} />
    },
    {
        path: '/product-type',
        exact: true,
        main:  ({  history }) => <ProductTypeListPage history={history} />
    },
    {
        path: '/product-type/edit/:id?',
        exact: true,
        main:  ({ match, history }) => <ProductTypeItemPage match={match} history={history} />
    },
    {
        path: '/product-type/import',
        exact: true,
        main:  ({  history }) => <ImportPage history={history} />
    },
    {
        path: '/account/verify/:id',
        exact: true,
        main:  ({ match, history }) => <VerifyPage match={match} history={history} />
    },
    {
        path: '/account/access-token',
        exact: true,
        main:  ({ match, history }) => <AccessTokenPage match={match} history={history} />
    },
    {
        path: '/active/account/:username',
        exact: true,
        main:  ({ match, history }) => <AcitveOTPPage match={match} history={history} />
    },
    {
        path: '/forgot-password',
        exact: true,
        main:  ({  history }) => <ForgotPage  history={history} />
    },
    {
        path: '/chat',
        exact: true,
        main:  ({  history }) => <ChatPage  history={history} />
    },
    {
        path: '/config-menu',
        exact: true,
        main:  ({  history }) => <ConfigMenuListPage  history={history} />
    },
    {
        path: '/config-menu/edit/:id?',
        exact: true,
        main:  ({ match, history }) => <ConfigMenuEditPage match={match} history={history} />
    },
    {
        path: '/history',
        exact: true,
        main:  ({  history }) => <HistoryPage  history={history} />
    },
    {
        path: '/config-icon-header',
        exact: true,
        main:  ({  history }) => <ConfigIconHeaderListPage  history={history} />
    },
    {
        path: '/config-icon-header/edit/:id?',
        exact: true,
        main:  ({ match, history }) => <ConfigIconHeaderEditPage match={match} history={history} />
    },
    // {
    //     path: '/product/add',
    //     exact: false,
    //     main: ({ location, history }) => <ProductEditPage location={location} history={history} />
    // },
    // {
    //     path: '/product/:id/edit',
    //     exact: false,
    //     main: ({ match, history }) => <ProductEditPage match={match} history={history} />
    // },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;