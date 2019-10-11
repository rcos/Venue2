<template>
  <div>
    <div class="recent">
      Recent Submissions
    </div>

    <div class ="scrolling-wrapper">
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
    </div>

    <div class="recent">
      Current Events
    </div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class = "nav-link active">CSCI</a>
      </li>
      <li class="nav-item">
        <a class="nav-link">MATH</a>
      </li>
      <li class="nav-item">
        <a class="nav-link">COMM</a>
      </li>
    </ul>

    <div class ="scrolling-wrapper">
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
      <div class="card">
        <h2>Card</h2>
      </div>
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style scoped>
.recent{
  text-align: center;
  font-size: 28px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding-left: 50px;
  padding-right: 50px;
}
.card{
  width: 400px;
  height: 300px;
  display: inline-block;
}
.classes{
  text-align: center;
}
.nav-pills {
  padding-left: 50px;
  padding-bottom: 5px;
}
.nav-link:hover{
  background: rgb(230,230,230);
}


</style>
