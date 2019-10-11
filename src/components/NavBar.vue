<template>
    <b-navbar class="navbar">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/Dashboard' }">
                <img
                    src="../assets/venuelogo.svg"
                    alt="Venue"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item  tag="router-link" to="/Classes">
                Classes
            </b-navbar-item>
            <b-navbar-item  tag="router-link" to="/Grades">
                Grades
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-dropdown label="Account">
                <b-navbar-item tag="router-link" to="/">
                    Edit Account
                </b-navbar-item>
                <b-navbar-item tag="router-link" to="/">
                    Log Out
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="burger">
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style lang="scss">
.navbar {
  background: rgb(124, 71, 146) !important;
  padding: 0px;
}

.b-navbar-item{
  background-color: white !important;
}
</style>
