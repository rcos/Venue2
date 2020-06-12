<template>
	<div>
    <div class="tabs" v-if="all_students">
      <button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)" tabindex="0" aria-label="Show Live Attendance"><h5>Live ({{Object.keys(live_submissions).length}}/{{all_students.length}})</h5></button>
      <button id="playback_btn" class="tab_btn" @click="selectTab(1)" tabindex="0" aria-label="Show Playback Attendance"><h5>Playback ({{playback_submissions.length}}/{{all_students.length}})</h5></button>
      <button id="absent_btn" class="tab_btn" @click="selectTab(2)" tabindex="0" aria-label="Show Absent"><h5>Absent ({{absent.length}}/{{all_students.length}})</h5></button>
      <button id="stats_btn" class="tab_btn" @click="selectTab(3)" tabindex="0" aria-label="Show Statistics"><h5>Statistics</h5></button>
    </div>
    <div class="tabs" v-else>
      <button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)" tabindex="0" aria-label="Show Live Attendance"><h5>Live</h5></button>
      <button id="playback_btn" class="tab_btn" @click="selectTab(1)" tabindex="0" aria-label="Show Playback Attendance"><h5>Playback</h5></button>
      <button id="absent_btn" class="tab_btn" @click="selectTab(2)" tabindex="0" aria-label="Show Absent"><h5>Absent</h5></button>
      <button id="stats_btn" class="tab_btn" @click="selectTab(3)" tabindex="0" aria-label="Show Statistics"><h5>Statistics</h5></button>
    </div>
    <div v-if="selected_tab === 0" id="live_submit" class="tab_section">
      <LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions="live_submissions" :is_live="true" />
    </div>
    <div v-if="selected_tab === 1" id="playback_submit" class="tab_section">
      <LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions="playback_submissions" :is_playback="true" />
    </div>
    <div v-if="selected_tab === 2" id="no_submit" class="tab_section">
      <LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions="absent" :is_absent="true" />
    </div>
    <div v-if="selected_tab === 3" id="stats" class="tab_section">
      Statistics
    </div>
		</div>
	</div>
</template>


<script>
  import LectureAttendanceList from '@/components/LectureAttendanceList.vue'

  export default {
    name: 'LectureAttendanceTable',
    props: {
      lecture: Object,
    	live_submissions: Array,
    	playback_submissions: Array,
    	absent: Array,
    	all_students: Array,
      is_instructor: Boolean
    },
    components: {
      LectureAttendanceList
    },
    data(){
      return {
        selected_tab: 0
      }
    },
    created() {
      console.log("in table. received live submissions", this.live_submissions)
      console.log("in table. received playback_submissions", this.playback_submissions)
      console.log("Length",Object.keys(this.live_submissions).length)
    },
    methods: {
    	selectTab(i) {
    	  let btns = [
    	    document.getElementById("live_btn"),
    	    document.getElementById("playback_btn"),
    	    document.getElementById("absent_btn"),
    	    document.getElementById("stats_btn")
    	  ]
    	  for(let j=0;j<btns.length;j++) {
    	    if(j==i) {
    	      btns[j].classList.add("selected_tab")
    	    } else {
    	      btns[j].classList.remove("selected_tab")
    	    }
    	  }
    	  this.selected_tab = i
    	}
    }
  }
</script>

<style scoped>
	.tabs {
	  margin-top: 5rem;
	  margin-left: 3rem;
	}

	.tab_btn {
	  background: none;
	  outline: none;
	  border: none;
	  color: gray;
	  margin-right: 3rem;
	}

	.tab_btn h5 {
	  color: gray;
	}

	.tab_btn.selected_tab {
	  color: blue;
	  border-bottom: .2rem solid blue;
	}

	.tab_btn.selected_tab h5 {
	  color: blue;
	}

	.tab_btn:focus {
	  color: gray;
	  border-bottom: .2rem solid gray;
	}

	.tab_btn.selected_tab:focus {
	  color: gray;
	  border-bottom: .2rem solid gray;
	}

	.tab_btn.selected_tab:focus h5 {
	  color: gray;
	}

	.tab_section {
	  margin-top: 3rem;
	  margin-left: 6rem;
	  overflow-y: auto;
	  /* height: 17rem; */
	  padding-bottom: 3rem;
	}
</style>