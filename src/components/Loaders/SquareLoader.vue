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
      position: relative;
      display:inline-block;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }

    .square-loader-centerer {
      height: 2.4rem;
      width: 2.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .square-loader .square {
      height: 0.6rem;
      width: 0.6rem;
      top: 0;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;
      position:relative;
      opacity: 0;
      border-radius: 0.15rem;
      box-shadow: 0px 1px 2px 0px var(--loader-square-shadow);
      animation: square-loader 2s infinite;
    }

    .square-loader .square.even {
      background: var(--loader-square-even);
      transition: background 250ms cubic-bezier(0.19, 1, 0.22, 1);
    }

    .square-loader .square.odd {
      background: var(--loader-square-odd);
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