<template>
  <div>

    <div class="container-fluid py-3">
      <h2 class="text-center">Current Events</h2>
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
export default {
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
