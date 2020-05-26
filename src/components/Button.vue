<template>
  <div class="container" style="padding:2rem;">
    <button @click="$emit('button-clicked')" v-bind:class="{hidden:fade_out, visible:fade_in}" type="button" class="btn button shadow" id="venue-btn">
      <!-- <div v-if="show_login_text">Login</div> -->
      <!-- <div v-else>Get Started</div> -->
      <div>{{ btn_text }}</div>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      // btn_str: String
      btn_text: String
    },
    data() {
      return {
        show_login_text: false,
        fade_out: false,
        fade_in: false
      }
    },
    created() {
    },
    methods: {
      toggleBtnText() {
        this.show_login_text = !this.show_login_text
      },
      fadeOut() {
        this.fade_out = true
      },
      fadeIn() {
        this.fade_in = true
      }
    }
  }
</script>

<style scoped>
  .button {
    background-color: white;
    font-size: 1.5rem;
    width: 12rem;
    /*margin-top: 1rem;*/
    border: #007bff solid;
    color: #007bff;
    border-radius: 5px;
  }

  #venue-btn:hover {
    background-color: #007bff;
    color: white;
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.2s, opacity 0.2s linear;
  }

  .visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 1s linear;
  }
</style>