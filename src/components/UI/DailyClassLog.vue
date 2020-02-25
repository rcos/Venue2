<template>
  <div class="log-list">
    <ul>
      <a href="#" v-for="(class_log, index) in logInfo" v-bind:key="index">
        <li :class="'active' in class_log && class_log.active == true ? 'active' : ''">
          <div class="identifier-area">
            <div class="list-vertical" :style="{height: '60px'}"></div>
            <div class="time-stamp">{{ getTimeCode(class_log.time) }}</div><div class="identifier" :style="{backgroundColor: colorIdentifier(index)}"></div>
          </div>
          <div class="info-area"
            :style="{backgroundColor: 'active' in class_log && class_log.active == true ? colorIdentifier(index) : 'white'}"
          >
            <div class="class-code">{{class_log.courseCode}}</div>
            <div class="class-name" :style="{fontSize: fontSizeByText(class_log.name)}">{{class_log.name}}</div>
          </div>
      </li></a>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DailyClassLog',
  props: {
    logInfo: {
      type: Array,
      required: true
    }
  },
  methods: {
    colorIdentifier: (i) => {
        let colors = ['#5D68FC', '#FC5D60', '#80E3A1', '#FC895D', '#B77DC2']
        if (i >= colors.length) return 'black'
        return colors[i]
    },
    fontSizeByText: (txt) => {
      let excess_len = txt.length - 16;
      let base_size = 13;

      while (excess_len > 0) {
        excess_len -= 4;
        base_size -= 1;
      }

      return base_size + 'px'
    },
    getTimeCode: (time_code) => {
      let time_suffix = 'a'
      let time_offset = 0
      // time code is noon or later
      if (time_code >=720) {
        time_suffix = 'p'
        time_offset = 12
      }
      return (Math.floor(time_code/60) - time_offset ) + time_suffix
    }
  }
}
</script>
