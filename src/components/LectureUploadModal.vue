<template>
  <div id="lecture-upload-modal">
    <input id="video_selector" type="file" />
    <button id="video_upload_btn" class="btn btn-secondary" disabled>Upload</button>
  </div>
</template>

<script>
//imports here
export default {
  name: "LectureUploadModal",
  props: {},
  computed: {},
  components: {},
  data() {
    return {};
  },
  created() {},
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
  methods: {}
};
</script>

<style scoped>
</style>