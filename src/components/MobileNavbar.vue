<template>
  <div>
    <div class="mobile-logo-area">
      <img src="@/assets/venue-logo.svg" class="venue-logo" />
    </div class="mobile-nav-area">
    <div class="nav-links-area">
      <a href="/dashboard#home" @click="setDashboardActive" :class="active == 'dashboard' ? 'nav-link active' : 'nav-link' ">Dashboard</a>
      <a href="/dashboard#courses" @click="setCoursesActive" :class="active == 'courses' ? 'nav-link active' : 'nav-link' ">Courses</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNavbar',
  data() {
    return {
      active: 'dashboard'
    }
  },
  mounted () {
    if (window.location.href.indexOf('#') == -1) {
      return;
    }

    let i = window.location.href.length - 1;
    while (i >= 0 && window.location.href.charAt(i) != '#') --i;
    i += 1;

    let id_ = window.location.href.substring(i);

    if (id_ == 'courses') {
      // show courses
      this.active = 'courses';
    }
    else {
      this.active = 'dashboard';
    }
  },
  methods: {
    setDashboardActive () {
      this.active = 'dashboard'
    },
    setCoursesActive () {
      this.active = 'courses'
    }
  }
}
</script>

<style>
.mobile-logo-area {
  width: 20%;
  height: 100px;
  display: inline-block;
  position: fixed;
  left: 0;
  top: 0;
  margin-bottom: 100px;
}

.nav-links-area {
  width: 78%;
  position: fixed;
  right: 0;
  text-align: left;
  top: 60px;
  margin-bottom: 100px;
}

.nav-links-area .nav-link {
  display: inline-block;
  font-weight: bold;
  opacity: 0.6;
  position: relative;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
}

.nav-links-area .nav-link.active {
  color: #466D85;
  opacity: 1;
}

.nav-links-area .nav-link.active::before {
  content: "";
  width: 50px;
  height: 3px;
  background: #466D85;
  position: absolute;
  bottom: 5px;
}

.mobile-logo-area img.venue-logo {
  width: 45%;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
