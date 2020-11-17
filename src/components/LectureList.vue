<template>
  <div class="lecture-list">
    <div v-if="lecture_list.length > 0">
      <span v-for="lecture in lecture_list" :key="lecture._id" class="lecture-list-item" :style="{width: two_lists? '50%': '100%'}">
        <LectureCard  :lecture_type="lecture_type" :lecture="lecture"/>
      </span>
    </div>
    <p v-else class="no-lecture-text"> No {{ lecture_type }} Lectures</p>
  </div>
</template>

<script>
  import LectureCard from '@/components/LectureCard.vue'

  export default {
    name: 'LectureList',
    props: {
      lecture_type: String,
      lecture_list: Array,
      two_lists: {
        type: Boolean,
        default: false
      }
    },
    computed: {
    },
    components: {
      LectureCard
    },
    data(){
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .lecture-list {
    height: 100%;
    width: 95%;
    margin: 1rem;
  }

  .lecture-list-item {
    display: inline-block;
    float: left;
  }

  .no-lecture-text {
    color: var(--dashboard-text-color);
  }

  /*Ipad & below*/
   @media only screen and (max-width: 800px) {
    .lecture-list {
      width: 95%;
    }
  } 
</style>
