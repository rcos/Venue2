<template>
  <div class="class-list">
    <ul>
      <a href="#" v-for="(class_, index) in classInfo" v-bind:key="index"><li>
        <div :style="{backgroundColor: indexColor(index)}" class="icon-identifier"></div>
        <div class="row" :style="{marginLeft: '10px'}">
          <div class="col-4 course-code">{{class_.courseCode}}</div>
          <div class="col-8 course-name" :style='{fontSize: fontSizeByText(class_.name)}'>{{class_.name}}</div>
        </div>
      </li></a>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ClassList',
  props: {
    classInfo: {
      type: Array,
      required: true
    }
  },
  methods: {
    indexColor: (i) => {
      let colors = ['#5D68FC', '#FC5D60', '#80E3A1', '#FC895D', '#B77DC2']

      if (i >= colors.length) return 'black'
      return colors[i]
    },
    fontSizeByText: (txt) => {
      let excess_len = txt.length - 16;
      let base_size = 14;

      while (excess_len > 0) {
        excess_len -= 4;
        base_size -= 1;
      }

      return base_size + 'px'
    }
  }
}
</script>
