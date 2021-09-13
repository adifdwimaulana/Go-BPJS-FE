import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'))
const Company = React.lazy(() => import('./Demo/Company/Company'))
const User = React.lazy(() => import('./Demo/User/User'))
const Ship = React.lazy(() => import('./Demo/Ship/Ship'))
const Voyage = React.lazy(() => import('./Demo/Voyage/Voyage'))
const Location = React.lazy(() => import('./Demo/Location/Location'))

const routes = [
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/management/company', exact: true, name: 'Management Company', component: Company },
    { path: '/management/patient', exact: true, name: 'Management User', component: User },
    { path: '/management/ship', exact: true, name: 'Management Ship', component: Ship },
    { path: '/management/voyage', exact: true, name: 'Management Voyage', component: Voyage },
    { path: '/voyage/:id', exact: true, name: 'Management Location', component: Location }
];

export default routes;