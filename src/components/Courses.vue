<<template>
  <div>
    <CourseCard v-for="course in courses" />
  </div>
</template>

<script>
  import CourseCard from '@/components/CourseCard.vue'

  export default {
    name: 'Courses',
    props: {
      courses: Array
    },
    components: {
      CourseCard
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

</style>