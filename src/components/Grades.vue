<template>
  <div class="container">

    <h2>My Grades</h2>

    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="class1" role="tabpanel" aria-labelledby="nav-home-tab">
        <table class="container table table-striped">
          <thead>
            <tr class="row">
              <th class="col">
                <b>Date</b>
              </th>
              <th class="col col-5">
                <b>Assignment</b>
              </th>
              <th class="col">
                <b>Points Earned</b>
              </th>
              <th class="col">
                <b>Points Possible</b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td class="col">
                7/2/19
              </td>
              <td class="col col-5">
                RCOS Attendance
              </td>
              <td class="col">
                10
              </td>
              <td class="col">
                10
              </td>
            </tr>
            <tr class="row">
              <td class="col">
                7/3/19
              </td>
              <td class="col col-5">
                RCOS Attendance
              </td>
              <td class="col">
                10
              </td>
              <td class="col">
                10
              </td>
            </tr>
            <tr class="row">
              <td class="col">
                7/4/19
              </td>
              <td class="col col-5">
                RCOS Attendance
              </td>
              <td class="col">
                7
              </td>
              <td class="col">
                10
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style scoped>
.container {
  margin-top: 5%;
}

.col-2 {
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0px;
  margin: -5px 0px 0px 0px;
}
.col-10 {
  margin: 0;
  padding: 0;
}

.col {
  border: 1px solid rgb(163, 163, 163);
}

</style>
