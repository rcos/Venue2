<template>

  <div class="card">
    <div class="card_image">
      <img src="../assets/venuelogo.svg" />
      </div>
    <div class="card_Event title-white">
      <p>Event Name</p>
    </div>
    <div class="card_Class title-white">
      <p>Class Name</p>
    </div>
    <div class="card_Time title-white">
      <p>Time</p>
    </div>
  </div>

</template>

<script>
export default {
};
</script>

<style scoped>
.card {
  margin: 30px auto;
  width: 250px;
  height: 250px;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.4s;
  background-color: DarkGray
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_Event {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-top: -150px;
  padding-bottom: 150px;
  height: 40px;
}

.card .card_Class {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin-top: -80px;
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 10px 10px rgba(0,0,0,0.25),
    -5px -5px 10px 10px rgba(0,0,0,0.22);
}

.title-white {
  color: white;
}

.title-black {
  color: black;
}

@media all and (max-width: 500px) {
  .card-list {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
  }
}

</style>
