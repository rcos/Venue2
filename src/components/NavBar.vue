<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand">
      <img src="../assets/venuelogo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      Venue
      <span class="badge badge-info">ALPHA</span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link to="/Classes" class="nav-link">Classes</router-link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link to="/Grades" class="nav-link">Grades</router-link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <router-link to="/Account" class="nav-link">Account</router-link>
        </li>
      </ul>
      <a class="nav-item">Log out</a>
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
  background: rgb(124, 71, 146);
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
