<template>

  <div class="change-password-container">

    <InputField type="password" :change="evaluateChange.bind(null, 'old_password')" ref="old_password" label="Old Password" />
    <br />
    <InputField type="password" :change="evaluateChange.bind(null, 'new_password')" ref="new_password" label="New Password" />
    <InputField type="password" :change="evaluateChange.bind(null, 'confirm_new_password')" ref="new_password_confirm" label="New Password" />
    <div class="form-error-area" v-if="error_message != null">Password change error goes here.</div>
    <div class="form-success-area" v-if="success_message != null">{{ success_message }}</div>
    <br />
    <br />
    <VenueButton width="50%" label="Change" :clickFn="executePasswordChange" :disabled="disabled_submit"/>
  </div>

</template>
<script>

  import InputField from '@/components/InputField.vue'
  import VenueButton from '@/components/VenueButton.vue'
  import UserAPI from '@/services/UserAPI.js'

  export default {
    name: 'ChangePassword',
    props: {
      complete: Function,
      current_user: Object
    },
    components: {
      InputField,
      VenueButton
    },
    data () {
      return {
        error_message: String,
        success_message: String,
        old_password: String,
        new_password: String,
        new_password_confirm: String,
        disabled_submit: Boolean
      }
    },
    created () {
      this.old_password = ""
      this.new_password = ""
      this.new_password_confirm = ""
      this.disabled_submit = true
      this.error_message = null
      this.success_message = null
    },
    methods: {
      evaluateChange (field_label, evt) {
        // console.log(evt.target.value)
        if (field_label == 'old_password') this.old_password = evt.target.value
        else if (field_label == 'new_password') this.new_password = evt.target.value
        else if (field_label == 'confirm_new_password') this.new_password_confirm = evt.target.value

        if (this.old_password.length > 4 && this.new_password.length > 4 && this.new_password_confirm.length > 4) {
          this.disabled_submit = false
        }
        else {
          this.disabled_submit = true
        }
      },
      executePasswordChange () {
        // process the old and new password inputs and then change password.


        console.log(`User ID: ${this.current_user._id}`)
        if (this.new_password != this.new_password_confirm) {
          this.error_message = "Passwords do not match."
          return;
        }

        UserAPI.changePassword(this.current_user._id, this.old_password, this.new_password)
        .then(response => {
          console.log(`Password changed ?`)
          console.log(response)

          if (response) {
            this.success_message = "Successfully changed password!"
            setTimeout(() => { this.complete() }, 1500)
          }
          else {
            this.error_message = "Old password is invalid"
          }
        })

      }
    }
  }

</script>
<style>
:root {
  --change-password-error: #FC6F71;
  --change-password-success: #34c759;
  --change-password-success-border: #158f34;
}
  .form-error-area {
    text-align: center;
    color: var(--change-password-error);
  }

  .form-success-area {
    text-align: center;
    color: var(--main-background-color);
    background-color: var(--change-password-success);
    border: 1px solid var(--change-password-success-border);
    padding: 15px 0px;
    border-radius: 5px;
    width: 60%;
    margin: 20px auto 0px;
  }
</style>
