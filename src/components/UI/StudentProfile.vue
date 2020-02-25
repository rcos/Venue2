<template>
  <div class="">
    <div class="labeled-info">
      <div class="label">
        Full Name
      </div>
      <div class="value">
        {{ user_info.fullName }}
      </div>
    </div>

    <div class="labeled-info">
      <div class="label">
        username
      </div>
      <div class="value">
        {{ user_info.username }}
      </div>
    </div>

    <div class="naked-button">
      Manage Password
    </div>

    <div class="naked-button">
      Report Bug
    </div>

    <div class="fixed-footer">
      <Button value="Log Out" href="#" />
    </div>

  </div>
</template>

<script>
  import Button from './Button.vue'

  export default {
    name: 'StudentProfile',
    components: {
      Button
    },
    data() {
      return {
        user_info: {
          fullName: "Milly Bobby-Brown",
          username: 'brownm4'
        }
      }
    }
  }
</script>

<style>
.labeled-info {
  margin: 20px 0px;
}

.labeled-info .label {
  opacity: 0.4;
  font-size: 12px;
}

.labeled-info .value {
  opacity: 0.8;
  font-size: 20px;
}

.naked-button {
  background-color: white;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 0px 15px;
  height: 30px;
  line-height: 30px;
  margin: 10px 0px;
  font-size: 14px;
  color: #085CAF;
  cursor: pointer;
  border-radius: 5px;
}

.fixed-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
