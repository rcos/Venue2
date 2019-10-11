<template>
  <div>
    <div class="section-header">
      Recent Submissions
    </div>
    
    <div class="group">
      <div class ="scrolling-wrapper">
        <div class="card valid">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
          </div>
        </div>

        <div class="card invalid">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
          </div>
        </div>

        <div class="card pending">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section-header">
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

    <div class="group">
      <div class ="scrolling-wrapper">
        <div class="card">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
            <a href="#" class="btn btn-primary">Create Submission</a>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
            <a href="#" class="btn btn-primary">Create Submission</a>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
            <a href="#" class="btn btn-primary">Create Submission</a>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
            <a href="#" class="btn btn-primary">Create Submission</a>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
            <a href="#" class="btn btn-primary">Create Submission</a>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Class name
          </div>
          <div class="card-body">
            <h5 class="card-title">CSCI XXXX</h5>
            <p class="card-text">Time: 12pm - 2pm</p>
            <a href="#" class="btn btn-primary">Create Submission</a>
          </div>
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
.section-header{
  text-align: center;
  font-size: 28px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.group{
  padding-left: 55px;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.card{
  display: inline-block;
  margin: 0 0 0 5px;
}
.card.valid{
  border-color:green;
  border-width: 3px;
}
.card.invalid{
  border-color:red;
  border-width: 3px;
}
.card.pending{
  border-color:gray;
  border-width: 3px;
}
.classes{
  text-align: center;
}
.nav-pills {
  padding-left: 60px;
  padding-bottom: 5px;
}
.nav-link:hover{
  background: rgb(230,230,230);
}


</style>
