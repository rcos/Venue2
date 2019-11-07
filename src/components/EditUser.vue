<template>
  <div>
    <h1>Edit User</h1>
    <form @submit.prevent="updateUser">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="user.first_name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Last Name</label>
              <textarea class="form-control" v-model="user.last_name" rows="5"></textarea>
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          user: {}
        }
      },
      created() {
        let uri = `http://localhost:4000/users/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.user = response.data;
        });
      },
      methods: {
        updateUser() {
          let uri = `http://localhost:4000/users/update/${this.$route.params.id}`;
          this.axios.post(uri, this.user).then(() => {
            this.$router.push({name: 'user'});
          });
        }
      }
    }
</script>