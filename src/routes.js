import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Users from './components/admin/User/Users.vue';
import EditUser from './components/admin/User/EditUser.vue';
import Instructors from './components/admin/User/Instructors.vue';
import Students from './components/admin/User/Students.vue';
import Course from './components/admin/Course/Course.vue';
import EditCourse from './components/admin/Course/EditCourse.vue';
import NewCourse from './components/admin/Course/NewCourse.vue';
import Courses from './components/admin/Course/Courses.vue';
import AdminSections from './components/admin/Section/AdminSections.vue';
import AdminEditSection from './components/admin/Section/AdminEditSection.vue';
import AdminNewSection from './components/admin/Section/AdminNewSection.vue';
import NewUser from './components/admin/User/NewUser.vue';
import OnboardUser from './views/OnboardUser.vue';
import AdminNewEvent from './components/admin/Event/AdminNewEvent.vue';
import AdminEvents from './components/admin/Event/AdminEvents.vue';
import AdminEditEvent from './components/admin/Event/AdminEditEvent.vue';
import NewSubmission from './components/admin/Submission/NewSubmission.vue';
import Submissions from './components/admin/Submission/Submissions.vue';
import LandingPage from './views/LandingPage.vue';
import SetPermanentPassword from './views/SetPermanentPassword.vue';
import Signup from './components/Signup.vue';
import Dashboard from './views/Dashboard.vue';
import CourseList from './components/CourseList.vue';
import CourseInfo from './views/CourseInfo.vue';
import NewEvent from './views/NewEvent.vue';
import EventInfo from './views/EventInfo.vue';
import LecturePlayback from './views/LecturePlayback.vue';
import WebexTest from './views/WebexTest.vue';
import NewLecture from './views/NewLecture.vue';
import LectureInfo from './views/LectureInfo.vue';
import Settings from './views/Settings.vue';
import RedirectCASLogin from './views/RedirectCASLogin.vue';
import Statistics from './views/Statistics.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      name: 'landing_page',
      path: '/',
      component: LandingPage,
      meta: { requiresNoLogin: true }
    },
    {
      name: 'settings',
      path: '/settings',
      component: Settings,
      meta: {
        title: "Venue - Settings",
        requiresAuth: true
      }
    },
    {
      name: 'new_user',
      path: '/admin/new_user',
      component: NewUser,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'users',
      path: '/admin/users',
      component: Users,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'edit_user',
      path: '/admin/edit_user/:id',
      component: EditUser,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'onboard_user',
      path: '/admin/onboard_user',
      component: OnboardUser,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'instructors',
      path: '/admin/instructors',
      component: Instructors,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'students',
      path: '/admin/students',
      component: Students,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'new_course',
      path: '/admin/new_course',
      component: NewCourse,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'course',
      path: '/Course',
      component: Course,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'editCourse',
      path: '/editCourse/:id',
      component: EditCourse,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'courses',
      path: '/admin/courses',
      component: Courses,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'admin_sections',
      path: '/admin/sections',
      component: AdminSections,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'admin_edit_section',
      path: '/admin/edit_section/:id',
      component: AdminEditSection,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'admin_new_section',
      path: '/admin/new_section',
      component: AdminNewSection,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'admin_new_event',
      path: '/admin/new_event',
      component: AdminNewEvent,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'admin_events',
      path: '/admin/events',
      component: AdminEvents,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'admin_edit_event',
      path: '/admin_edit_event/:id',
      component: AdminEditEvent,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'new_submission',
      path: '/new_submission',
      component: NewSubmission,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'submissions',
      path: '/admin/submissions',
      component: Submissions,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'signup',
      path: '/signup',
      component: Signup,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      meta: {
        title: "Venue - Dashboard",
        requiresAuth: true
      }
    },
    // {
    //   name: 'user_courses',
    //   path: '/user_courses',
    //   component: CourseList,
    //   meta: {
    //     title: "Venue - Courses",
    //     requiresAuth: true
    //   }
    // },
    {
      name: 'course_info',
      path: '/course_info/:id',
      component: CourseInfo,
      meta: {
        title: "Venue - Course Info",
        requiresAuth: true
      }
    },
    {
      name: 'new_event',
      path: '/new_event/:course_id',
      component: NewEvent,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'event_info',
      path: '/event_info/:event_id',
      component: EventInfo,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'webex_test',
      path: '/webex_test',
      component: WebexTest,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'lecture_playback',
      path: '/lecture_playback/:lecture_id',
      component: LecturePlayback,
      meta: {
        title: "Venue - Lecture Playback",
        requiresAuth: true,
      }
    },
    {
      name: 'new_lecture',
      path: '/new_lecture/:course_id',
      component: NewLecture,
      meta: {
        title: "Venue - New Lecture",
        requiresAuth: true,
        requiresInstructor: true
      }
    },
    {
      name: 'lecture_info',
      path: '/lecture_info/:lecture_id',
      component: LectureInfo,
      meta: {
        title: "Venue - Lecture Info",
        requiresAuth: true,
      }
    },
    {
      name: 'set_permanent_password',
      path: '/set_permanent_password/:user_id',
      component: SetPermanentPassword,
      meta: {
        requiresNoLogin: true
      }
    },
    {
      name: 'redirect_cas_login',
      path: '/redirectCASLogin',
      component: RedirectCASLogin,
      meta: {
        title: "Venue - Redirecting",
        requiresNoLogin: true
      }
    },
    {
      name: 'statistics',
      path: '/statistics',
      component: Statistics,
      meta: {
        title: "Venue - Statistics",
        requiresAuth: true,
        requiresInstructor: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (loggedIn) {

      const user_data = JSON.parse(loggedIn)

      if(to.matched.some(record => record.meta.requiresAdmin)) {

        if (user_data.current_user.is_admin) {
          next()
        } else {
          next('/dashboard')
        }

      } else if (to.matched.some(record => record.meta.requiresInstructor)) {

        if (user_data.current_user.is_instructor) {
          next()
        } else {
          next('/dashboard')
        }

      } else {
        next()
      }

    } else {
      next('/')
    }

  } else if (to.matched.some(record => record.meta.requiresNoLogin)) {

    if (loggedIn) {
      next('/dashboard')
    } else {
      next()
    }

  } else {
    next()
  }
})

export default router
