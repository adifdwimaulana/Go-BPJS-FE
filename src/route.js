import React from 'react';

const Logout = React.lazy(() => import('./Demo/Authentication/Logout/Logout'));
const Login = React.lazy(() => import('./Demo/Authentication/Login/Login'));

const route = [
    { path: '/logout', exact: true, name: 'Logout', component: Logout },
    { path: '/login', exact: true, name: 'Login', component: Login }
];

export default route;