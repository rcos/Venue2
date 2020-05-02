<template>
    <div class="loader-container">
      <div class="loader-centerer">
        <div class="self-building-square-spinner">
          <div class="square even"></div>
          <div class="square odd"></div>
          <div class="square even"></div>
          <div class="square clear odd"></div>
          <div class="square even"></div>
          <div class="square odd"></div>
          <div class="square clear even"></div>
          <div class="square odd"></div>
          <div class="square even"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'SquareLoader'
    }
</script>

<style>
  .self-building-square-spinner, .self-building-square-spinner div {
      box-sizing: border-box;
    }

    .self-building-square-spinner {
      height: 40px;
      width: 40px;
      top: calc( -10px * 2 / 3);
    }

    .loader-container {
      width: 100%;
      text-align: center;
    }

    .loader-centerer {
      width: 37px;
      margin: 0 auto;
      padding-top: 50px;
      padding-bottom: 50px;
    }

    .self-building-square-spinner .square {
      height: 10px;
      width: 10px;
      top: calc( -10px * 2 / 3);
      margin-right: calc(10px / 3);
      margin-top: calc(10px / 3);
      float: left;
      position:relative;
      opacity: 0;
      animation: self-building-square-spinner 6s infinite;
    }

    .self-building-square-spinner .square.even {
      background: #4CC9FF;
    }

    .self-building-square-spinner .square.odd {
      background: #FC6E71;
    }

    .self-building-square-spinner .square:nth-child(1) {
      animation-delay: calc(300ms * 6);
    }

    .self-building-square-spinner .square:nth-child(2) {
      animation-delay: calc(300ms * 7);
    }

    .self-building-square-spinner .square:nth-child(3) {
      animation-delay: calc(300ms * 8);
    }

    .self-building-square-spinner .square:nth-child(4) {
      animation-delay: calc(300ms * 3);
    }

    .self-building-square-spinner .square:nth-child(5) {
      animation-delay: calc(300ms * 4);
    }

    .self-building-square-spinner .square:nth-child(6) {
      animation-delay: calc(300ms * 5);
    }

    .self-building-square-spinner .square:nth-child(7) {
      animation-delay: calc(300ms * 0);
    }

    .self-building-square-spinner .square:nth-child(8) {
      animation-delay: calc(300ms * 1);
    }

    .self-building-square-spinner .square:nth-child(9) {
      animation-delay: calc(300ms * 2);
    }

    .self-building-square-spinner .clear{
      clear: both;
    }

    @keyframes self-building-square-spinner {
      0% {
        opacity: 0;
      }
      5% {
        opacity: 1;
        top: 0;
      }
      50.9% {
        opacity: 1;
        top: 0;
      }
      55.9% {
        opacity: 0;
        top: inherit;
      }
    }
</style>