<template>
  <div id="map" class="map">Your map</div>
</template>

<script>
  import GoogleMapsLoader from 'google-maps'

export default{
  mounted: function () {
    //create new google map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(42.7302, -73.6788), //map starts at RPI
      zoom: 16 //starting zoom (higher number means futher zoomed in)
    });

    //set up drawing component of map. Allows user to draw a cirle, polygon, or rectangle
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
    });
    drawingManager.setMap(map);

    //grab coordinates of geofence
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(polygon) {
      document.write("<h1>Coordinates:</h1>");
      var coordinatesArray = polygon.overlay.getPath().getArray();
      for(var i = 0; i < coordinatesArray.length; i++){
        document.write("<div>");
        document.write(coordinatesArray[i].toString());
        document.write("</div>");
      }
    });
  }
}
</script>

<style scoped>
  .map{
    height: 500px;
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
