<template>
  <div id="lecture-upload-modal">
    <input id="video_selector" name="lecturevideo" type="file" />
    <button id="video_upload_btn" class="btn btn-secondary" @click="addLecture" disabled>Upload</button>
  </div>
</template>

<script>
import LectureAPI from "../services/LectureAPI";
// accept="video/*"
export default {
  name: "LectureUploadModal",
  props: ["event"],
  computed: {},
  components: {},
  data() {
    return {
      lecture: {}
    };
  },
  created() {
    this.lecture.event = this.$props.event._id;
    this.lecture.title = this.$props.event.title;
    this.lecture.video_ref = "/videos/" + this.lecture.event;
  },
  mounted() {
    let vid_selector = document.getElementById("video_selector");
    let vid_upload_btn = document.getElementById("video_upload_btn");

    vid_selector.addEventListener("change", function() {
      if (vid_selector.files.length == 0) {
        vid_upload_btn.setAttribute("disabled");
      } else {
        vid_upload_btn.removeAttribute("disabled");
      }
    });
  },
  methods: {
    async addLecture() {
      LectureAPI.addLecture(this.lecture);
    }
  }
};
</script>

<style scoped>
</style>