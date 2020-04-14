<template>
  <div id="map" class="map">Your map</div>
</template>

<script>
import GoogleMapsLoader from "google-maps";

export default {
  name: "GoogleMap",
  data() {
    return {
      selected_geofence: []
    };
  },
  mounted: function() {
    var self = this;
    //create new google map
    var map = new google.maps.Map(document.getElementById("map"), {
      center: new google.maps.LatLng(42.7302, -73.6788), //map starts at RPI
      zoom: 16 //starting zoom (higher number means futher zoomed in)
    });
    // //set up drawing component of map. Allows user to draw a cirle, polygon, or rectangle
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ["polygon"]
      }
    });
    drawingManager.setMap(map);
    //grab coordinates of geofence
    google.maps.event.addListener(drawingManager, "overlaycomplete", function(
      polygon
    ) {
      var coordinatesArray = polygon.overlay.getPath().getArray();
      this.selected_geofence = coordinatesArray;
      self.$emit("update:selected_geofence", this.selected_geofence);
    });
  }
};
</script>

<style scoped>
.map {
  height: 500px;
  width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
