<template>
  <div id="lecture-upload-modal">
    <button class="btn btn-primary" @click="handleShowModal">Upload Lecture Video...</button>
    <div v-if="showModal" id="lecture_modal_viewable">
      <div class="row titlerow">
        <h1 id="banner_title">New Lecture Video</h1>
      </div>
      <div class="row filerow">
        <input id="video_selector" name="lecturevideo" type="file" accept="video/*" class="btn"/>
      </div>
      <div class="row" id="lecture_container" v-if="file_selected">
        <div class="col-8" id="preview">
          <video
            id="video_player"
            class="video-js"
            controls
            preload="auto"
            poster=""
            data-setup='{}'>
            <!-- <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" /> -->
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <a href="http://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video
              </a>
            </p>
          </video>
        </div>
        <div class="col">
          <div id="polls">
            <PollCard v-for="i in n_polls" :key="i" :ref="'pollRef' + i"/>
            <button id="add_poll_btn" class="btn btn-primary" @click="addPoll()">+</button>
          </div>
        </div>
      </div>
      <div class="row" id="bottomrow">
        <input id="playback_start" placeholder="Playback Submission Start"/>
        <input id="playback_end" placeholder="Playback Submission End"/>
        <button id="video_upload_btn" class="btn btn-secondary" @click="addLecture()" disabled>Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import LectureAPI from "../services/LectureAPI";
import PollCard from "./PollCard";
import videojs from "video.js";
import flatpickr from "flatpickr";
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/material_blue.css");
// DatePicker themes options:
// "material_blue","material_green","material_red","material_orange",
// "dark","airbnb","confetti"

export default {
  name: "LectureUploadModal",
  props: {
    lecture: Object
  },
  computed: {},
  components: {
    PollCard
  },
  data() {
    return {
      file_selected: false,
      showModal: false,
      n_polls: 0
    };
  },
  created() {
    this.lecture.video_ref = "/videos/" + this.lecture._id + "/";
  },
  mounted() {
  },
  methods: {
    async addLecture() {
      LectureAPI.addLecturePlayback(
        this.lecture,
        document.getElementById("video_selector").files[0]
      ).then(res => {
        console.log("About to save polls. Refs:")
        console.log(this.$refs)
        for(let i in this.$refs) {
          this.$refs[i][0].savePoll(res.data._id)
        }
      });
    },
    handleShowModal() {
      this.showModal = true
      this.$nextTick(() => {
        let vid_selector = document.getElementById("video_selector");
        let vid_upload_btn = document.getElementById("video_upload_btn");
        let self = this;
        vid_selector.addEventListener("change", function() {
          if (vid_selector.files.length == 0) {
            vid_upload_btn.setAttribute("disabled");
            self.file_selected = false;
          } else {
            vid_upload_btn.removeAttribute("disabled");
            self.polls = [];
            self.file_selected = true;
            self.$nextTick(() => {
              var srcEl = document.createElement("source")
              srcEl.setAttribute("src",URL.createObjectURL(vid_selector.files[0]))
              srcEl.setAttribute("type",vid_selector.files[0].type)
              
              document.getElementById("video_player").prepend(srcEl)

              var fp0 = flatpickr(document.getElementById("playback_start"),{
                enableTime: true,
                minDate: Date.now(),
                onChange: function(selectedDates, dateStr, instance) {
                  self.lecture.playback_submission_start_time = Date.parse(dateStr)
                  fp1.set("minDate",self.lecture.playback_submission_start_time)
                  if(self.lecture.playback_submission_start_time > self.lecture.playback_submission_end_time) {
                    fp1.setDate(self.lecture.playback_submission_start_time)
                  }
                }
              })
              var fp1 = flatpickr(document.getElementById("playback_end"),{
                enableTime: true,
                minDate: Date.now(),
                onChange: function(selectedDates, dateStr, instance) {
                  self.lecture.playback_submission_end_time = Date.parse(dateStr)
                }
              })
            })
          }
        });
      })
    },
    handleHideModal() {
      this.showModal = false
    },
    addPoll() {
      this.n_polls++
    }
  }
};
</script>

<style scoped>
#banner_title {
  text-align: center;
  position: relative;
  top: 6rem;
  height: 3rem;
  width: 100%;
  margin: 0;
}
.titlerow {
  height: 9rem;
}
.filerow {
  height: 6rem;
}
#lecture_modal_viewable {
  position: fixed;
  background: white;
  top: 6%;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
}
#close_lecture_modal {
  position: absolute;
  width: 2rem;
  height: 2rem;
  left: 0;
  margin: 0;
  padding: 0;
}
#preview {
  position: relative;
}
#lecture_container {
}
#video_selector {
  position: relative;
  top: 3rem;
  height: 3rem;
  margin: 0 auto;
}
#video_player {
  width: 100%;
  height: auto;
}
#add_poll_btn {
  width: 100%;
}
.col {
  padding: 0;
}
.row {
  padding-left: 1rem;
  padding-right: 1rem;
}
#toprow {
  height: 4rem;
}
#bottomrow {
  position: absolute;
  height: 4rem;
  bottom: 0;
  left: 0;
  right: 0;
}
#polls {
  position: absolute;
  padding-right: 5px;
  top: 0px;
  bottom: 15px;
  width: 100%;
  overflow: auto;
}
#playback_start {
  height: 4rem;
  width: 40%;
  font-size: 1.5rem;
}
#playback_end {
  height: 4rem;
  width: 40%;
  font-size: 1.5rem;
}
#video_upload_btn {
  height: 4rem;
  width: 20%;
}
</style>