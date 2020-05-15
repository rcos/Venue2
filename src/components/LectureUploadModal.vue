<template>
  <div id="lecture-upload-modal">
    <button class="btn btn-primary" @click="handleShowModal">Upload lecture video</button>
    <div v-if="showModal" id="lecture_modal_viewable">
      <div class="row">
          <button id="close_lecture_modal" class="btn btn-secondary" @click="showModal = false">X</button>
      </div>
      <input id="video_selector" name="lecturevideo" type="file" accept="video/*" />
      <button id="video_upload_btn" class="btn btn-secondary" @click="addLecture()" disabled>Upload</button>
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
        <div class="input-wrapper" id="submission-time-wrapper">
          <label>Submission Start Time</label>
          <datetime
            class="time-picker"
            type="datetime"
            use12-hour
            value-zone="local"
            title="Submission Start"
            v-model="lecture.playback_submission_start_time"
          ></datetime>
          <label>Submission End Time</label>
          <datetime
            class="time-picker"
            type="datetime"
            use12-hour
            value-zone="local"
            title="Submission End"
            v-model="lecture.playback_submission_end_time"
          ></datetime>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LectureAPI from "../services/LectureAPI";
import PollCard from "./PollCard";
import videojs from "video.js";
import { Datetime } from "vue-datetime";

export default {
  name: "LectureUploadModal",
  props: {
    lecture: Object
  },
  computed: {},
  components: {
    PollCard,
    datetime: Datetime,
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
#lecture_modal_viewable {
  position: absolute;
  background: white;
  border: 1px solid black;
  top: 100px;
  bottom: 100px;
  left: 100px;
  right: 100px;
}
#close_lecture_modal {
  position: absolute;
  width: 30px;
  margin: 0;
  margin-left: 15px;
  padding: 0;
}
#lecture_container {
  margin: 0;
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 0px;
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
#polls {
  position: absolute;
  padding-right: 5px;
  top: 0px;
  bottom: 15px;
  width: 100%;
  overflow: auto;
}
</style>