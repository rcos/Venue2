<template>
  <body class = "home">
    <img class = "homeimg" alt="Angular Logo" src="../assets/venuelogo.svg">
    <h1>Welcome to Venue</h1>
    <div>
      <button type="button" class="btn btn-secondary btn-other">
          <router-link to="/Dashboard" class="nav-link">Login with CAS</router-link>
      </button>
      or
      <div class="btn-group">
        <button type="button" class="btn btn-primary">
          <router-link to="/Login" class="nav-link">Login</router-link>
        </button>
        <button type="button" class="btn btn-danger">
          <router-link to="/Register" class="nav-link">Register</router-link>
        </button>
      </div>
    </div>
    <hr>
    <p>Venue is a platform that allows instructors to give students credit for attending
      events. An instructor signs on
      and creates courses and events, students can then use the venue app to upload event submissions, which can contain
      images or GPS data that verifies a student attended an event.</p>
  </body>
</template>

<script>
export default {
}
</script>

<style>
.home {
  background: white;
  margin-top: 100px;
  text-align: center;
  margin-left: 5%;
  width: 90%;
  height: 83vh;
}

.homeimg {
  width: 25%;
}

p{
  max-width: 70vw;
  margin: 0 auto;
}


.btn-other {
  background: #911BC4 !important;
  margin: 5px;
}

.btn-second {
  background: grey !important;
}

.btn-group {
  margin: 5px;
}

hr {
  background: black;
}

</style>
