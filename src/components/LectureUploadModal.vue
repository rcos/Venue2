<template>
  <div id="lecture-upload-modal">
    <button class="btn btn-primary" @click="handleShowModal">Upload lecture video</button>
    <div v-if="showModal" id="lecture_modal_viewable">
      <div class="row">
          <button id="close_lecture_modal" class="btn btn-secondary" @click="showModal = false">X</button>
      </div>
      <input id="video_selector" name="lecturevideo" type="file" accept="video/*" />
      <button id="video_upload_btn" class="btn btn-secondary" @click="addLecture" disabled>Upload</button>
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
          <div v-for="(poll,i) in polls" v-bind:key="i">
            <PollCard/>
          </div>
          <button id="add_poll_btn" class="btn btn-primary" @click="polls.push({})">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LectureAPI from "../services/LectureAPI";
import PollCard from "./PollCard";
import videojs from "video.js";

export default {
  name: "LectureUploadModal",
  props: ["event"],
  computed: {},
  components: {PollCard},
  data() {
    return {
      lecture: {},
      file_selected: false,
      showModal: false,
      polls: []
    };
  },
  created() {
    this.lecture.event = this.$props.event._id;
    this.lecture.title = this.$props.event.title;
    this.lecture.video_ref = "/videos/" + this.lecture.event + "/";
  },
  mounted() {
  },
  methods: {
    async addLecture() {
      LectureAPI.addLecture(
        this.lecture,
        document.getElementById("video_selector").files[0]
      );
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
              let vidEl = document.getElementById("video_player")
              let localURL = URL.createObjectURL(vid_selector.files[0])
              var localType = vid_selector.files[0].type;

              var srcEl = document.createElement("source")
              srcEl.setAttribute("src",localURL)
              srcEl.setAttribute("type",localType)
              
              console.log(srcEl)
              vidEl.prepend(srcEl)
              console.log(vidEl)
              // let vid = videojs(vidEl).ready(function() {
              // }); // Ref to your video el
            })
          }
        });
      })
    },
    handleHideModal() {
      this.showModal = false
    },
    handleNewPoll() {
      
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
</style>