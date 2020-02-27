<template>
  <!-- ADDING USER -->
  <div>
    <h2>Create An Event</h2>
    <form @submit.prevent="addEvent">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>title:</label>
            <input type="text" class="form-control" v-model="event.title">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group" v-if="section.course">
              <label>Section:</label>
              <input class="form-control" v-model="section.course.name" readonly>
              <input class="form-control" v-model="section.number" readonly>
            </div>
            <div v-else>
              <label>Section:</label>
              <input class="form-control" readonly>
              <input class="form-control" readonly>
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>

    <Sections v-on:select-section="selectSection" />

  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';
  import Sections from '../Section/Sections';

  export default {
    name: 'NewEvent',
    components: {
      Sections
    },
    data(){
      return {
        event: {},
        section: {}
      }
    },
    created() {
    },
    methods: {
      selectSection(section) {
        this.section = section
      },
      async addEvent(evt){
        evt.preventDefault();
        this.event.section = this.section
        const response = await EventAPI.addEvent(this.event);
        this.$router.push({name: 'events'});
      }
    }
  }
</script>