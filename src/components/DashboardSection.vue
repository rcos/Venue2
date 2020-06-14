<template>
  <div class="dashboard-section">
    <div class="dashboard-section-title-container">
      <h3>{{ lecture_type }}</h3>
    </div>
    <div class="dashboard-section-body-container">
      <LectureList />
    </div>
  </div>
</template>

<script>
  import LectureList from '@/components/LectureList'

  export default {
    name: 'DashboardSection',
    props: {
      lecture_type: String
    },
    computed: {
    },
    components: {
      LectureList
    },
    data(){
      return {
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .dashboard-section {
    border: green solid;
    height: 15rem;
    width: 50%;
    display: inline-block;
  }

  .dashboard-section-title-container {
    border: blue solid;
    height: 20%;
    text-align: left;
    padding-left: 2rem;
  }

  .dashboard-section-body-container {
    border: red solid;
    height: 80%;
  }

  /*Ipad & below*/
  @media only screen and (max-width: 800px) {
    .dashboard-section {
      width: 100%;
      height: 10rem;
    }

    .dashboard-section-title-container {
      text-align: center;
      padding: 0;
    }
  }

</style>
