<template>
  <div>
    <div class="desktop-logo-area">
      <img src="@/assets/venue-logo.svg" class="venue-logo" />
    </div>
    <div class="desktop-nav-area">
      <div class="desktop-nav-links-area">
        <a href="/dashboard" class="nav-link active">Dashboard</a>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
.desktop-logo-area {
  position: fixed;
  width: 15%;
  height: 100px;
  left: 0;
  top: 0;
}

.desktop-logo-area img.venue-logo {
  width: 80px;
  float: right;
  position: absolute;
  right: 0;
  bottom: 0;
}

.desktop-nav-links-area {
  width: 83%;
  position: fixed;
  right: 0;
  text-align: left;
  top: 60px;
  margin-bottom: 100px;
}

.desktop-nav-links-area .nav-link {
  display: inline-block;
  font-weight: bold;
  font-size: 13px;
  opacity: 0.6;
  position: relative;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
}

.desktop-nav-links-area .nav-link.active {
  color: #466D85;
  opacity: 1;
}

.desktop-nav-links-area .nav-link.active::before {
  content: "";
  width: 50px;
  height: 3px;
  background: #466D85;
  position: absolute;
  bottom: 5px;
}

</style>
