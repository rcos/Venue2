<template>
  <div>
  <div v-if="this.show==true">
  <div ref="draggableContainer" id="snooze-box">
    <div id="draggable-header" @mousedown="dragMouseDown">
      <p id = "header">Lecture Meeting Reminder</p>
    </div>
    <div>
      <p>{{lecture.title}} <p>
      <p>Start Time: {{formatStart}}</p>
      <p>End Time: {{formatEnd}}</p>
    </div>
    <div>
      <button>Join</button>
    </div>
    <div>
      <button onclick="show()">Snooze</button>
      <div id="snooze-time">
        <ul v-on:click="delay(2)">5 minutes</ul>
        <ul v-on:click="delay(2)">10 minutes</ul>
        <ul v-on:click="delay(2)">15 minutes</ul>
        <ul v-on:click="delay(2)">30 minutes</ul>
      </div>
    </div>
  </div>
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
        show: true,
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
        this.show = true
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
      },
      sleep: function(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      },
      delay: function(time){
        //document.getElementById("snooze-box").style.visibility = "hidden";
        this.show=false
        this.$forceUpdate();
        console.log(this.show)
        this.sleep(time*3*1000).then(() => {
        // Do something after the sleep!
        //document.getElementById("snooze-box").style.visibility = "visible";
        this.show=true
        console.log(this.show)
        this.$forceUpdate();
        });
      },
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
