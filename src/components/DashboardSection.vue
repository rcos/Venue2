<template>
  <div class="dashboard-section">
    <div class="dashboard-section-title-container">
      <h4 class="dashboard-section-title">{{ lecture_type }}</h4>
    </div>
    <div class="dashboard-section-body-container">
      <LectureList :lecture_type="lecture_type" />
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
    /*border: green solid;*/
    height: 15rem;
    width: 50%;
    display: inline-block;
    vertical-align: top;
    margin-top: 2rem;
  }

  .dashboard-section-title-container {
    /*border: blue solid;*/
    height: 15%;
    text-align: left;
    padding-left: 2rem;
  }

  .dashboard-section-title {
    color: #2C3E50;
    font-weight: bold;
  }

  .dashboard-section-body-container {
    border: red solid;
    height: 85%;
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
