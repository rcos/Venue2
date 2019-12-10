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
      </div>
    </div>

    <div class="container-fluid py-3">
      <h2 class="text-center">Recent Submission</h2>
      <div class="card-columns">
        <RecentCard></RecentCard>
        <RecentCard></RecentCard>
        <RecentCard></RecentCard>
        <RecentCard></RecentCard>
        <RecentCard></RecentCard>
        <RecentCard></RecentCard>
      </div>
    </div>


  </div>

</template>


<script>
import EventCard from "../components/EventCard";
import RecentCard from "../components/RecentCard";
export default {
  name: 'App',
  components: {
    EventCard,
    RecentCard
  }
}

</script>

<style scoped>

/* xs only */
@media(max-width: 767px) {
  .card-columns {
    column-count: 2;
  }
}
/* small and up */
@media(min-width: 768px) {
  .card-columns {
    column-count: 2;
  }
}
/* sm only */
@media(min-width: 768px) and (max-width: 991px) {
  .card-columns {
    column-count: 4;
  }
}
/* md and up */
@media(min-width: 992px) {
  .card-columns {
    column-count: 4;
  }
}
/* md only */
@media(min-width: 992px) and (max-width: 1199px) {
  .card-columns {
    column-count: 4;
  }
}
/* lg and up */
@media(min-width: 1200px) {
  .card-columns {
    column-count: 8;
  }
}
</style>
