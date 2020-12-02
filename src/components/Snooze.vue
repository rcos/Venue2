<template>
  <div ref="draggableContainer" id="snooze-box">
    <div id="draggable-header" @mousedown="dragMouseDown">
      <p id = "header">Lecture Meeting Reminder</p>
    </div>
    <div>
      <p>{{lecture.title}} <p>
      <p>Start Time: {{formatStart}}</p>
      <p>End Time: {{formatEnd}}</p>
    </div>
  </div>
</template>



<script>

  import LectureAPI from '@/services/LectureAPI.js'

  export default {
    name: 'Snooze',
    data(){
      return {
        lectures: [],
        positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
        }
      }
    },
    computed:{
      formatStart: function(){
        var date = new Date(this.lecture.start_time);
        return date.getMonth()+"-"+date.getDate()+ " at "+(date.getHours()%12)+":"+date.getMinutes()+":"+date.getSeconds();
      },
      formatEnd: function(){
        var date = new Date(this.lecture.end_time);
        var d = date.getDate();
        var m = date.getMonth();
        return date.getMonth()+"-"+date.getDate()+ " at "+(date.getHours()%12)+":"+date.getMinutes()+":"+date.getSeconds();
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData(){
         this.getLectures()
      },
      async getLectures(){
        const response4 = await LectureAPI.getLectures()
        this.lectures = response4.data
      },
      dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
    },
    props: {
      lecture:{
        type: Object,
      },
      mode:{
        type: String,
      }
    },
  }
</script>


<style>

#snooze-box {
  border:1px solid black;
  position: absolute;
  width:300px;
  height:100px;
  bottom: 0;
  right: 0;
  z-index: 100;
  overflow-y: scroll;
}
#header{
  text-align: left;
  padding-left: 2px;
  font-weight: bold;

}
#draggable-header {
  z-index: 10;
}
</style>
