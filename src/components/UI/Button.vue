<template>
  <div class="container-fluid">
    <div class="row centered-container btn-container">
        <button class="venue-button" v-on:click="clickFunction(href, onClick)" >{{ value }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    value: {
      type: String,
      required: true
    },
    href: {
      type: String
    },
    onClick: {
      type: Function
    }
  },
  methods: {
    clickFunction: (href, callback) => {

      if (href != undefined) {
        window.location.replace (href);
      }
      else if (callback != undefined) {
        console.log (callback);
        callback ();
      }

    }
  }
}
</script>
