import Dashboard from './components/Dashboard.vue';
import Account from './components/Account.vue';
import Grades from './components/Grades.vue';
import Home from './components/Home.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/Account', component: Account },
    { path: '/Dashboard', component: Dashboard },
    { path: '/Grades', component: Grades },
];

export default routes;
