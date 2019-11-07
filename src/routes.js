import Dashboard from './components/Dashboard.vue';
import Account from './components/Account.vue';
import Grades from './components/Grades.vue';
import Home from './components/Home.vue';
import User from './components/User.vue';
import EditUser from './components/EditUser.vue';

const routes = [
    { 
    	path: '/', 
    	component: Home 
    },
    { 
    	path: '/Account', 
    	component: Account 
    },
    { 
    	path: '/Dashboard', 
    	component: Dashboard 
    },
    { 
    	path: '/Grades', 
    	component: Grades 
    },
    {  
    	name: 'user',
    	path: '/User', 
    	component: User 
    },
    {  
    	name: 'editUser',
    	path: '/edit/:id', 
    	component: EditUser
    }
];

export default routes;
