<!-- <template>
    <b-navbar class="navbar">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/Dashboard' }">
                <img
                    src="../assets/venuelogo.svg"
                    alt="Venue"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item  tag="router-link" to="/Classes">
                Classes
            </b-navbar-item>
            <b-navbar-item  tag="router-link" to="/Grades">
                Grades
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-dropdown label="Account">
                <b-navbar-item tag="router-link" to="/">
                    Edit Account
                </b-navbar-item>
                <b-navbar-item tag="router-link" to="/">
                    Log Out
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="burger">
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style lang="scss">
.navbar {
  background: rgb(124, 71, 146) !important;
  padding: 0px;
}

.b-navbar-item{
  background-color: white !important;
}
</style> -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand">
      <router-link to="/Dashboard" class="nav-link">
        <img src="../assets/venuelogo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      </router-link>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link to="/Grades" class="nav-link">Grades</router-link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link to="/Account" class="nav-link">Account</router-link>
        </li>
      </ul>
      <router-link to="/" class="nav-link">
        <a class="nav-item">Log out</a>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style>
.navbar{
  background: rgb(124, 71, 146) !important;
}
.nav-item {
  color: white ! important;
}
a.nav-link, a.navbar-brand {
  color: white !important;
}
.navbar-light .navbar-toggler-icon {
  filter: invert(100%);
}
.navbar-brand{
}
</style>
