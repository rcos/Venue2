<template>

  <div class="change-password-container">

    <InputField type="password" label="Old Password" />
    <br />
    <InputField type="password" label="New Password" />
    <InputField type="password" label="New Password" />
    <div class="form-error-area" v-if="error_message != null">Password change error goes here.</div>
    <div class="form-success-area" v-if="success_message != null">{{ success_message }}</div>
    <br />
    <br />
    <VenueButton width="50%" label="Change" :clickFn="executePasswordChange" disabled/>
  </div>

</template>
<script>

  import InputField from '@/components/InputField.vue'
  import VenueButton from '@/components/VenueButton.vue'

  export default {
    name: 'ChangePassword',
    props: {
      complete: Function
    },
    components: {
      InputField,
      VenueButton
    },
    data () {
      return {
        error_message: String,
        success_message: String
      }
    },
    created () {
      this.error_message = null
      this.success_message = null
    },
    methods: {
      executePasswordChange () {
        // process the old and new password inputs and then change password.

        let error = false
        // if there is an error ...
        if (error) {
          this.error_message = "<Enter error message here>"
        }
        else {
          this.success_message = "Successfully changed password!"
          setTimeout(() => { this.complete() }, 1500)
        }

      }
    }
  }

</script>
<style>
  .form-error-area {
    text-align: center;
    color: #FC6F71;
  }

  .form-success-area {
    text-align: center;
    color: white;
    background-color: #34c759;
    border: 1px solid #158f34;
    padding: 15px 0px;
    border-radius: 5px;
    width: 60%;
    margin: 20px auto 0px;
  }
</style>
