<template>
  <div v-if="hover===parent">
  <div class="dropdown-content">
    <router-link v-for="content in this.nested_contents" :key="content._id" :to="{name: 'course_info', params: { id: content._id }}">
      <p>{{ parent.name }}  {{ content.name }}</p>
    </router-link>
  </div>
  <div :class="'active-link-underline ' + ( this.is_active?'active':'')"></div>
  </div>
</template>

<script>

  export default {
    name: 'NestedDropDown',
    data(){
      return {
        nested_contents: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData(){
        for (let i = 0; i < this.dd_content.length; i++){
          if(this.dd_content[i][0]==this.parent){
            this.nested_contents=this.dd_content[i][1]
          }
        }
      }
    },
    props: {
      is_active: {
        type: Boolean,
      },
      dd_content: {
        type: Array,
      },
      parent:{
        type: Object,
      },
      hover:{
        type: Object,
      },
    }
  }
</script>


<style scoped>

.dropdown-content{
  margin-left: -1rem;
  margin-top: 0.2rem;
  /* background-color: #f7f7f7; */
  z-index: 9999;
  border-radius: 0.5rem;
  /* transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1); */
}

.dropdown-content a{
  color: #2C3E50;
  background-color: #f7f7f7;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  display: block;
  max-height: 3rem;
  width: 15rem;
  margin: 0px;
  padding: 12px 16px;
  box-shadow: 0px 3px 3px 0px rgba(109, 109, 109, 0.644);
  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
}

.dropdown-content a:first-of-type {
  border-radius: 0.5rem 0.5rem 0rem 0rem;
}
.dropdown-content a:last-of-type{
  border-radius: 0rem 0rem 0.5rem 0.5rem;
}
.dropdown-content a:not(:first-of-type) {
  border-top: 0.1rem solid rgba(0, 0, 0, 0.15);
}
.dropdown-content a:last-of-type{
  border-radius: 0rem 0rem 0.5rem 0.5rem;
}
.dropdown-content a:only-of-type {
  border-radius: 0.5rem;
}
.dropdown-content a:hover,
.dropdown-content a:focus {
  background-color: #466D85;
  color: white;
  outline: none;
  box-shadow: 0px 3px 3px 0px rgba(85, 85, 85, 0.644) inset, 0px -3px 3px 0px rgba(179, 179, 179, 0.644) inset;
}
</style>
