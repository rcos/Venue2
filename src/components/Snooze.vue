<template>
  <div>
  <div v-if="this.show==true">
  <div ref="draggableContainer" id="snooze-box">
    <div id="draggable-header" @mousedown="dragMouseDown">
      <p id = "header">Lecture Meeting Reminder</p>
    </div>
    <div class = "info">
      <p>{{lecture.title}} <p>
      <p>Start Time: {{formatStart}}</p>
      <p>End Time: {{formatEnd}}</p>
    </div>
    <div id="snooze">
      <select class="form-control" @change="delay($event)">
      <option value="">Snooze</option>
      <option v-for="time in this.times" :value="time.id" :key="time.id">{{ time.name }}</option>
      </select>
    </div>
    <div id="join">
      <button id="join"> <a href="`{this.lecture.meeting_link}`">Join</a> </button>
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
        show: null,
        times : null,
        selectedTime: null
        }
      }
    },
    computed:{
      formatStart: function(){
        var date = new Date(this.lecture.start_time);
        var ampm = (date.getHours() >= 12) ? 'pm' : 'am'
        return date.getMonth()+"-"+date.getDate()+ " at "+(date.getHours()%12)+":"+date.getMinutes()+" "+ampm;
      },
      formatEnd: function(){
        var date = new Date(this.lecture.end_time);
        var d = date.getDate();
        var m = date.getMonth();
        var ampm = (date.getHours() >= 12) ? 'pm' : 'am'
        return date.getMonth()+"-"+date.getDate()+ " at "+(date.getHours()%12)+":"+date.getMinutes()+" "+ampm;
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData(){
        this.show = true
        this.times= [
          { name: "5 minutes", id: 5 },
          { name: "10 minutes", id: 10 },
          { name: "15 minutes", id: 15 },
          { name: "30 minutes", id: 30 },
        ]
        this.getLectures()
        this.NaNCheck()
      },
      async getLectures(){
        const response4 = await LectureAPI.getLectures()
        this.lectures = response4.data
      },
      timeCheck(){
        var today = new Date()
        var start = new Date(this.lecture.start_time);
        var end = new Date(this.lecture.end_time);
        var res= (today>=start && today<=end) ? true : false;
        console.log(today>=start)
        console.log(today<=end)
        if(!res){
          console.log("should not show...")
          this.show = false
          this.$forceUpdate();
        }
      },
      NaNCheck(){
        var start = new Date(this.lecture.start_time);
        var end = new Date(this.lecture.end_time);
        var startCheck = (isNaN(start.getMonth()) ||  isNaN(start.getDate()) ||  isNaN(start.getHours())||  isNaN(start.getMinutes()));
        var endCheck =  isNaN(end.getMonth()) ||  isNaN(end.getDate()) ||  isNaN(end.getHours())||  isNaN(end.getMinutes());
        if(startCheck||endCheck){
          this.show = false
          this.$forceUpdate();
        }
        else{
          console.log("timecheck??")
          this.timeCheck()
        }
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
      delay: function(event){
        this.selectedTime = parseInt(event.target.options[event.target.options.selectedIndex].text)
        console.log(this.selectedTime)
        this.show=false
        this.$forceUpdate();
        this.sleep(this.selectedTime*60000).then(() => {
        console.log(this.selectedTime*60000)
        this.show=true
        this.$forceUpdate();
        });
      },
      hide: function(){
        this.show=false
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
  height:150px;
  bottom: 0;
  right: 0;
  z-index: 100;
  //overflow-y: scroll;
  background-color: yellow;
}
#header{
  text-align: left;
  padding-left: 2px;
  font-weight: bold;

}
#draggable-header {
  z-index: 10;
}
#join,#snooze{
  float: right;
  margin-right: 1 px;
  padding: 0.2em;
  margin: 0.1em 0.2em;
  -moz-box-sizing: content-box; /* or `border-box` */
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
.info{
  text-align: left;
}

</style>
