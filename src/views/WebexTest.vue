<template>
  <div>
    <h1>Webex Test</h1>
  </div>
</template>

<script>

export default {
  name: "NewEvent",
  components: {
  },
  data() {
    return {
      meeting_info: Object
    };
  },
  created() {
    // let xmlhttp = new XMLHttpRequest()
    // xmlhttp.open("POST","books")

    let xml_body_str = `<?xml version="1.0" encoding="ISO-8859-1"?>
<serv:message
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:serv="http://www.webex.com/schemas/2002/06/service">
    <header>
        <securityContext>
            <siteName>rensselaer.webex.com</siteName>
            <webExID>mbizin</webExID>
            <password>Numfor#135</password>
        </securityContext>
    </header>
    <body>
        <bodyContent xsi:type="java:com.webex.service.binding.meeting.GetMeeting">
            <meetingKey></meetingKey>
        </bodyContent>
    </body>
</serv:message>`

    let config = { headers: {'Access-Control-Allow-Credentials':true, 'crossorigin': true} };

    let uri = `https://api.webex.com/WBXService/XMLService`;
    // // Might need to change to post request
    this.axios.post(uri, xml_body_str, config).then((response) => {
        this.meeting_info = response.data;
    });
  },
  methods: {
  }
};
</script>

<style>
</style>