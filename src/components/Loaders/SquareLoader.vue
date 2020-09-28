<template>
  <div class="square-loader">
    <div class="square-loader-centerer">
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
</template>

<script>
    export default {
        name: 'SquareLoader'
    }
</script>

<style>

    .square-loader {
      vertical-align: middle;
      width: 100%;
      height: 100%;
    }

    .square-loader-centerer {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -1.2rem 0px 0px -1.2rem;
    }

    .square-loader .square {
      height: 0.6rem;
      width: 0.6rem;
      top: 0;
      margin-right: calc(0.6rem / 3);
      margin-bottom: calc(0.6rem / 3);
      float: left;
      position:relative;
      opacity: 0;
      border-radius: 0.15rem;
      box-shadow: 0px 1px 2px 0px rgba(128, 128, 128, 0.5);
      animation: square-loader 2s infinite;
    }

    .square-loader .square.even {
      background: #4CC9FF;
      transition: background 250ms cubic-bezier(0.19, 1, 0.22, 1);
    }

    .square-loader .square.odd {
      background: #FC6E71;
      transition: background 250ms cubic-bezier(0.19, 1, 0.22, 1);
    }

    .square-loader .square:nth-child(1) {
      animation-delay: calc(200ms * 6);
    }

    .square-loader .square:nth-child(2) {
      animation-delay: calc(200ms * 7);
    }

    .square-loader .square:nth-child(3) {
      animation-delay: calc(200ms * 8);
    }

    .square-loader .square:nth-child(4) {
      animation-delay: calc(200ms * 3);
    }

    .square-loader .square:nth-child(5) {
      animation-delay: calc(200ms * 4);
    }

    .square-loader .square:nth-child(6) {
      animation-delay: calc(200ms * 5);
    }

    .square-loader .square:nth-child(7) {
      animation-delay: calc(200ms * 0);
    }

    .square-loader .square:nth-child(8) {
      animation-delay: calc(200ms * 1);
    }

    .square-loader .square:nth-child(9) {
      animation-delay: calc(200ms * 2);
    }

    .square-loader .clear{
      clear: both;
    }

    @keyframes square-loader {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
</style>