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
const Medicine = React.lazy(() => import('./Demo/Medicine/Medicine'))
const Document = React.lazy(()=> import('./Demo/Document/Document'))
const Request = React.lazy(()=> import('./Demo/Request/Request'))

const routes = [
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/management/medicine', exact: true, name: 'Management Medicine', component: Medicine },
    { path: '/management/patient', exact: true, name: 'Management Patient', component: User },
    { path: '/management/request', exact: true, name: 'Management Request', component: Request },
    { path: '/document', exact: true, name: 'Document Request', component: Document },
    { path: '/management/ship', exact: true, name: 'Management Ship', component: Ship },
    { path: '/management/voyage', exact: true, name: 'Management Voyage', component: Voyage },
    { path: '/voyage/:id', exact: true, name: 'Management Location', component: Location }
];

export default routes;