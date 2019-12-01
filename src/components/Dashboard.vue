<template>
  <div>
    <div>
      <button type="button" class="btn btn-primary">
        <router-link to="/CreateEvent" class="nav-link">New Event</router-link>
      </button>
    </div>
    <div class="container-fluid py-3">
      <h2 class="text-center">Current Events</h2>
      <div class="card-columns">
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
      </div>
    </div>

    <div class="container-fluid">
      <h2 class="text-center">Recent Submissions</h2>
      <div class="card-columns">
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
        <div class = "card">
          <img class="card-img-top img-fluid" src="//placehold.it/350x350/" alt="Card image cap">
        </div>
      </div>
    </div>


  </div>

</template>


<script>
import EventCard from "../components/EventCard";
export default {
  name: 'App',
  components: {
    EventCard
  }
}

</script>

<style scoped>

/* lg and up */
@media(min-width: 1200px) {
  .card-columns {
    column-count: 8;
  }
}
</style>
