<template>
  <div id="lecture-upload-modal">
    <button type="button" class="btn btn-primary" @click="handleShowModal" :tabindex="(modal_open ? '-1' : '0')">Upload Lecture Video...</button>
    <div id="lecture_modal_viewable" class="hiddenModal">
      <div class="row titlerow">
        <h1 id="banner_title" aria-label="New Lecture Video">New Lecture Video <button type="button" v-if="update_lecture" id="cancel_upload_btn" class="btn btn-secondary" @click="hideModal" aria-label="Cancel Video Upload">Cancel</button>
          <button type="button" v-else id="cancel_upload_btn" class="btn btn-secondary" @click="hideModal()" aria-label="Cancel Video Upload">Cancel</button>
        </h1>
      </div>
      <div class="row filerow">
        <input id="video_selector" name="lecturevideo" type="file" accept="video/*" class="btn" role="button" tabindex="0" aria-label="Select Video and Show Poll Creation Options"/>
      </div>
      <div class="row" id="lecture_container" v-if="file_selected">
        <div class="col">
          <h2>Add Poll</h2>
          <div class="poll_card">
            <div class="row questionrow">
              <label id="question_label">Question</label>
              <textarea id="question" class="col" type="text" placeholder="eg. Which of the following...?" aria-labelledby="question_label"/>
            </div>
            <div class="row">
              <div class="col-4">
                <!-- <label for="hour">Hour:</label> -->
                  <label id="hour_label">Hour</label>
                  <input type="number" id="hour" min="0" max="5" aria-labelledby="hour_label"/>
              </div>
              <div class="col-4">
                <!-- <label for="min">Minute:</label> -->
                  <label id="minute_label">Min</label>
                  <input type="number" id="min" min="0" max="59" aria-labelledby="minute_label"/>
              </div>
              <div class="col-4">
                <!-- <label for="sec">Second:</label> -->
                  <label id="seconds_label">Sec</label>
                  <input type="number" id="sec" min="0" max="59" aria-labelledby="seconds_label"/>
              </div>
            </div>
            <h4 class="row">Possible Answers</h4>
            <div class="row">
              <label id="spacer1">Number</label>
              <label id="a_label">Answer</label>
              <label id="correct_label">Correct</label>
            </div>
            <ol class="row possible_answer">
              <li v-for="(current_answer,i) in current_answers" v-bind:key="i">
                <!-- <p class="answernumber">{{i + 1}}</p> -->
                <input class="answerfield" type="text" v-model.lazy="current_answers[i]" aria-labelledby="a_label"/>
                <input class="iscorrectfield" type="checkbox" v-model.lazy="current_is_correct[i]" aria-labelledby="correct_label"/>
                <button type="button" class="btn btn-danger removeanswer" @click="current_answers.splice(i,1);current_is_correct.splice(i,1)" :aria-label="'Remove Answer '+(i+1)">X</button>
              </li>
            </ol>
            <div class="row addanswerrow">
              <button type="button" id="add_answer_btn" class="btn btn-secondary" @click="current_answers.push('');current_is_correct.push(false)">Add Option</button>
            </div>
            <div class="row">
              <button type="button" id="add_poll_btn" class="btn btn-primary" @click="addPoll()">Save Poll</button>
            </div>
          </div>
        </div>
        <div class="col">
          <h2>Current Polls</h2>
          <label v-if="polls.length > 0" id="pq_label">Question</label>
          <ol class="row pollrow">
            <li v-for="(poll,i) in polls" :key="i" class="row prow">
              <p class="polltimestamp">{{secondsToHHMMSS(poll.timestamp)}}</p>
              <input class="pollquestion" :value="poll.question" readonly aria-labelledby="pq_label"/>
              <button type="button" class="removepollbtn btn btn-danger" @click="polls.splice(i,1)" :aria-label="'Remove Poll '+(i+1)">X</button>
            </li>
          </ol>
        </div>
        <div class="col-5">
          <video id="video_player" class="video-js vjs-big-play-centered" controls></video>
        </div>
      </div>
      <div class="row" id="bottomrow">
        <label id="playback_start_label">Playback Submission Start</label>
        <input id="playback_start" aria-labelledby="playback_start_label" type="datetime-local"/>
        <label id="playback_end_label">Playback Submission End</label>
        <input id="playback_end" aria-labelledby="playback_end_label" type="datetime-local"/>
        <button type="button" v-if="update_lecture" id="video_upload_btn" class="btn btn-secondary" @click="updateLecture()" disabled>Upload</button>
        <button type="button" v-else id="video_upload_btn" class="btn btn-secondary" @click="hideModal()" disabled>Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import LectureAPI from "../services/LectureAPI";
import PlaybackPollAPI from "../services/PlaybackPollAPI";
import flatpickr from "flatpickr";
import videojs from 'video.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/material_blue.css");
// DatePicker themes options:
// "material_blue","material_green","material_red","material_orange",
// "dark","airbnb","confetti"

export default {
  name: "LectureUploadModal",
  props: {
    lecture: Object,
    update_lecture: Boolean
  },
  computed: {},
  components: {
  },
  data() {
    return {
      file_selected: false,
      current_answers: [],
      current_is_correct: [],
      polls: [],
      video_ref: "",
      vjs: null,
      play_sub_start: null,
      play_sub_end: null,
      modal_open: false
    };
  },
  beforeDestroy() {
    if(this.vjs) {
      this.vjs.dispose()
    }
  },
  methods: {
    async updateLecture() {
      if(this.isComplete()) {
        this.lecture.video_ref = "/videos/" + this.lecture._id + "/";
        let lecture_video = document.getElementById("video_selector").files[0]
        await LectureAPI.addPlaybackVideo(this.lecture._id, lecture_video)
        await LectureAPI.updateToPlayback(this.lecture, lecture_video)
        let n_saved = 0
        if(this.polls.length == 0) {
          this.hideModal()
          location.reload()
        } else {
          for(let i=0;i<this.polls.length;i++) {
            this.polls[i].lecture = this.lecture._id
            PlaybackPollAPI.addPoll(this.polls[i])
            .then(res => {
              n_saved++
              if(n_saved == this.polls.length) {
                this.polls = []
                this.hideModal()
                location.reload()
              }
            })
          }
        }
      }
    },
    async updateLectureFromParent(lect,course_id) {
      lect.video_ref = "/videos/" + lect._id + "/";
      let lecture_video = document.getElementById("video_selector").files[0]
      await LectureAPI.addPlaybackVideo(lect._id, lecture_video)
      await LectureAPI.updateToPlayback(lect, lecture_video)
      let n_saved = 0
      if(this.polls.length == 0) {
        this.hideModal()
        this.$router.push({
          name: "course_info",
          params: { id: course_id }
        })
      } else {
        for(let i=0;i<this.polls.length;i++) {
          this.polls[i].lecture = lect._id
          PlaybackPollAPI.addPoll(this.polls[i])
          .then(res => {
            n_saved++
            if(n_saved == this.polls.length) {
              this.polls = []
              this.hideModal()
              this.$router.push({
                name: "course_info",
                params: { id: course_id }
              })
            }
          })
        }
      }
    },
    setLectureSubmissionVariables() {
      this.lecture.allow_live_submissions = false
      this.lecture.allow_playback_submissions = true
    },
    handleShowModal() {
      this.showModal()
      this.$nextTick(() => {
        let vid_selector = document.getElementById("video_selector");
        let vid_upload_btn = document.getElementById("video_upload_btn");
        let self = this;
        vid_selector.addEventListener("change", function() {
          if (vid_selector.files.length == 0) {
            vid_upload_btn.setAttribute("disabled","true");
            self.file_selected = false;
          } else {
            vid_upload_btn.removeAttribute("disabled");
            self.polls = [];
            self.file_selected = true;
            //videojs player implementation
            self.$nextTick(() => {
              if(self.vjs == null) {
                videojs("video_player", {}, function() {
                  self.vjs = this
                  self.vjs.src({ type: vid_selector.files[0].type, src: URL.createObjectURL(vid_selector.files[0]) })
                  self.vjs.load()
                })
              } else {
                self.vjs.src({ type: vid_selector.files[0].type, src: URL.createObjectURL(vid_selector.files[0]) })
                self.vjs.load()
              }
              self.play_sub_start = flatpickr(document.getElementById("playback_start"),{
                enableTime: true,
                dateFormat: "h:i K, M d, Y",
                minDate: Date.now(),
                minuteIncrement: 1,
                onChange: function(selectedDates, dateStr, instance) {
                  self.lecture.playback_submission_start_time = Date.parse(dateStr)
                  self.play_sub_end.set("minDate",self.lecture.playback_submission_start_time)
                  if(self.lecture.playback_submission_start_time > self.lecture.playback_submission_end_time) {
                    self.lecture.playback_submission_end_time = Date.parse(dateStr)
                    self.play_sub_end.setDate(self.lecture.playback_submission_start_time)
                  }
                }
              })
              self.play_sub_end = flatpickr(document.getElementById("playback_end"),{
                enableTime: true,
                dateFormat: "h:i K, M d, Y",
                minDate: Date.now(),
                minuteIncrement: 1,
                onChange: function(selectedDates, dateStr, instance) {
                  self.lecture.playback_submission_end_time = Date.parse(dateStr)
                }
              })
            })
          }
        });
      })
    },
    hideModal() {
      this.modal_open = false 
      this.$emit('openstatus', false)
      document.getElementById('lecture_modal_viewable').classList.add('hiddenModal')
    },
    showModal() {
      this.modal_open = true
      this.$emit('openstatus', true)
      document.getElementById('lecture_modal_viewable').classList.remove('hiddenModal')
    },
    addPoll() {
      let question = document.getElementById("question")
      let hour = document.getElementById("hour")
      let min = document.getElementById("min")
      let sec = document.getElementById("sec")
      let answers = document.getElementsByClassName("answerfield")
      let iscorrect = document.getElementsByClassName("iscorrectfield")
      let a = []
      let c = []
      let found_empty = false
      for(let i=0;i<answers.length;i++) {
        if(answers[i].value == "") {
          found_empty = true
        } else {
          a.push(answers[i].value)
        }
      }
      let secs = 0;
      if(hour.value) {
        secs += (parseInt(hour.value)*3600)
      }
      if(min.value) {
        secs += (parseInt(min.value)*60)
      }
      if(sec.value) {
        secs += (parseInt(sec.value))
      }
      if(!found_empty && question.value != "" && secs > 0 && secs < this.vjs.duration()) {
        for(let i=0;i<iscorrect.length;i++) {
          if(iscorrect[i].checked) {
            c.push(answers[i].value)
          }
        }
        this.polls.push({
          lecture: this.lecture._id,
          question: question.value,
          possible_answers: a,
          correct_answers: c,
          timestamp: secs
        })
        this.polls.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)

        this.current_answers = []
        this.current_is_correct = []
        question.value = ""
        hour.value = ""
        min.value = ""
        sec.value = ""
      }
    },
    isComplete() {
      return (document.getElementById("playback_start").value != "" && document.getElementById("playback_end").value != "")
    },
    secondsToHHMMSS(seconds) {
      return (new Date(seconds * 1000).toISOString().substr(11, 8))
    }
  }
};
</script>

<style scoped>
#lecture-upload-modal {
  display: inline-flex;
  margin-left: 2rem;
}
#banner_title {
  text-align: center;
  position: relative;
  width: 100%;
  margin: 0;
}
.titlerow {
  padding-top: 4rem;
}
.filerow {
  height: 5rem;
}
h2 {
  text-align: center;
}
#cancel_upload_btn {
  position: relative;
}
#lecture_modal_viewable {
  position: fixed;
  background: white;
  top: 6%;
  left: 0rem;
  right: 0rem;
  bottom: 2rem;
  overflow-y: scroll;
  z-index: 999;
  padding-left: 1rem;
  padding-right: 1rem;
}
#close_lecture_modal {
  position: absolute;
  width: 2rem;
  height: 2rem;
  left: 0;
  margin: 0;
  padding: 0;
}
#lecture_container {
  position: relative;
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
}
#video_selector {
  position: relative;
  top: 2rem;
  height: 3rem;
  margin: 0 auto;
}
#video_player {
  width: 100%;
  height: auto;
}
#toprow {
  height: 4rem;
}
#bottomrow {
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 3rem;
  margin: 0;
  width: 100%;
}
#playback_start {
  height: 4rem;
  width: 20%;
  font-size: 1.5rem;
}
#playback_end {
  height: 4rem;
  width: 20%;
  font-size: 1.5rem;
}
#playback_start_label {
  height: 4rem;
  width: 20%;
  font-size: 1.5rem;
}
#playback_end_label {
  height: 4rem;
  width: 20%;
  font-size: 1.5rem;
}
#video_upload_btn {
  height: 4rem;
  width: 20%;
}
li {
  width: 100%;
}
#pq_label {
  width: 100%;
  text-align: center;
}
.possible_answer {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  margin: 0;
}
#spacer1 {
  width: 15%;
}
.answernumber {
  width: 15%;
  text-align: center;
}
#a_label {
  width: 65%;
  text-align: center;
}
.answerfield {
  position: relative;
  width: 80%;
  height: 1rem;
  font-size: 1rem;
}
#correct_label {
  width: 10%;
}
.iscorrectfield {
  /* margin-left: 2rem; */
  margin-top: 0.5rem;
  width: 10%;
  height: 1rem;
}
.removeanswer {
  width: 10%;
  padding: 0;
}
#add_answer_btn {
  position: absolute;
  left: 0;
  width: 100%;
  margin: 0;
}
#add_poll_btn {
  position: absolute;
  right: 0;
  margin: 0;
}
.addanswerrow {
  height: 2.5rem;
  margin-bottom: 1rem;
}
#question,
#hour,
#min,
#sec {
  font-size: 1rem;
}

#question {
  height: 3rem;
  resize: none;
}

h4 {
  padding-top: 1rem;
}

p {
  position: relative;
  margin: 0;
  height: 1rem;
  font-size: 1rem;
  top: 0.45rem;
}
.pollrow {
  list-style-type: none;
  margin-left: 0rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}
.polltimestamp {
  position: relative;
  width: 15%;
  margin: 0 auto;
  font-size: 0.75rem;
  text-align: center;
}
.pollquestion {
  position: relative;
  width: 70%;
  margin: 0;
}
.removepollbtn {
  position: relative;
  margin: 0 auto;
  padding: 0.25rem;
  height: 2rem;
}
.hiddenModal {
  display: none;
}
.vjs-tech {
	position:unset;
}
</style>