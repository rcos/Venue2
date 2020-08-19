<template>
  <div class="square-loader">
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
</template>

<script>
    export default {
        name: 'SquareLoader'
    }
</script>

<style>

    .square-loader {
      display: inline-block;
    }

    .square-loader .square {
      height: 10px;
      width: 10px;
      top: calc( -10px * 2 / 3);
      margin-right: calc(10px / 3);
      margin-bottom: calc(10px / 3);
      float: left;
      position:relative;
      opacity: 0;
      animation: square-loader 2s infinite;
    }

    .square-loader .square.even {
      background: #4CC9FF;
      transition: background 250ms linear;
    }

    .square-loader .square.odd {
      background: #FC6E71;
      transition: background 250ms linear;
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
      5% {
        opacity: 0.5;
        top: 0;
      }
      50.9% {
        opacity: 1;
        top: 0;
      }
      95% {
        opacity: 0;
        top: inherit;
      }
    }
</style>