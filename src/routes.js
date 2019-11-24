import Dashboard from './components/Dashboard.vue';
import Account from './components/Account.vue';
import Grades from './components/Grades.vue';
import Home from './components/Home.vue';
import CreateEvent from './components/CreateEvent.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/Account', component: Account },
    { path: '/Dashboard', component: Dashboard },
    { path: '/Grades', component: Grades },
    { path: '/CreateEvent', component: CreateEvent},
];

export default routes;
