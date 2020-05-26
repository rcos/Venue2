<template>

  <div
    :class="'venue-button-dynamic ' + (disabled? 'disabled' : '')"
    v-on:click="executeFunction()"
    :style="{width: width}"
    >{{ label }}</div>

</template>
<script>

  export default {
    name: 'VenueButton',
    props: {
      label: {
        type: String,
        default: "<empty>"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clickFn: {
        type: Function,
        default: () => { console.log(`Default button function.`) }
      },
      width: {
        type: String,
        default: '100%'
      }
    },
    methods: {
      executeFunction () {
        if (!this.disabled) this.clickFn ()
      }
    }
  }

</script>
<style>

  .venue-button-dynamic.disabled {
    color: rgba(44, 62, 80, 0.4);
    border: 3px solid rgba(44, 62, 80, 0.5);
    cursor: not-allowed;
    background-color: white;
  }

  .venue-button-dynamic.disabled:hover {
      color: rgba(44, 62, 80, 0.4);
      border: 3px solid rgba(44, 62, 80, 0.5);
      background-color: white;
      box-shadow: 0px 2px 5px rgba(44, 62, 80, 0.1);
  }

  .venue-button-dynamic {
    border: 3px solid rgba(44, 62, 80, 1);
    margin: 0 auto;
    text-align: center;
    color: rgba(44, 62, 80, 1);
    height: 45px;
    line-height: 40px;
    cursor: pointer;
    background-color: white;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.25s, color 0.25s, box-shadow 0.25s, border 0.25s;
    box-shadow: 0px 2px 5px rgba(44, 62, 80, 0.1);
  }

  .venue-button-dynamic:hover {
    background-color: #FC6F71;
    color: white;
    box-shadow: 0px 0px 10px 5px rgba(252, 111, 113, 0.2);
    border: 3px solid rgba(252, 111, 113, 1);
  }

</style>
