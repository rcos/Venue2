<template>
  <div class="uml-canvas">

    <div id="uml-user" class="uml-object">
      <div class="uml-object-name">User</div>
      <div class="uml-variables">
        <div class="uml-line"><span class="uml-name">first_name</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">last_name</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">user_id</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">email</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">temp_password</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">password</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">connect_sid</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">is_admin</span>: <span class="uml-class">Boolean</span></div>
        <div class="uml-line"><span class="uml-name">instructor_courses</span>: <span class="uml-class">List&lt;ObjectID&gt;</span></div>
        <div class="uml-line"><span class="uml-name">ta_sections</span>: <span class="uml-class">List&lt;ObjectID&gt;</span></div>
        <div class="uml-line"><span class="uml-name">student_sections</span>: <span class="uml-class">List&lt;ObjectID&gt;</span></div>
        <div class="uml-line"><span class="uml-name">dark_mode</span>: <span class="uml-class">Boolean</span></div>
      </div>
      <div class="uml-methods">

      </div>
    </div>
    <div id="uml-section" class="uml-object">
      <div class="uml-object-name">Section</div>
      <div class="uml-variables">
        <div class="uml-line"><span class="uml-name">course</span>: <span class="uml-class">ObjectID</span></div>
        <div class="uml-line"><span class="uml-name">name</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">teaching_assistants</span>: <span class="uml-class">List&lt;String&gt;</span></div>
        <div class="uml-line"><span class="uml-name">students</span>: <span class="uml-class">List&lt;String&gt;</span></div>
        <div class="uml-line"><span class="uml-name">is_public</span>: <span class="uml-class">Boolean</span></div>
      </div>
      <div class="uml-methods">

      </div>
    </div>
    <div id="uml-course" class="uml-object">
      <div class="uml-object-name">Course</div>
      <div class="uml-variables">
        <div class="uml-line"><span class="uml-name">name</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">prefix</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">suffix</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">instructors</span>: <span class="uml-class">List&lt;String&gt;</span></div>
        <div class="uml-line"><span class="uml-name">is_public</span>: <span class="uml-class">Boolean</span></div>
        <div class="uml-line"><span class="uml-name">sections</span>: <span class="uml-class">List&lt;ObjectID&gt;</span></div>
      </div>
      <div class="uml-methods">

      </div>
    </div>
    <div id="uml-lecture" class="uml-object">
      <div class="uml-object-name">Lecture</div>
      <div class="uml-variables">
        <div class="uml-line"><span class="uml-name">title</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">sections</span>: <span class="uml-class">List&lt;ObjectID&gt;</span></div>
        <div class="uml-line"><span class="uml-name">allow_live_submissions</span>: <span class="uml-class">Boolean</span></div>
        <div class="uml-line"><span class="uml-name">allow_playback_submissions</span>: <span class="uml-class">Boolean</span></div>
        <div class="uml-line"><span class="uml-name">start_time</span>: <span class="uml-class">Date</span></div>
        <div class="uml-line"><span class="uml-name">end_time</span>: <span class="uml-class">Date</span></div>

        <div class="uml-child-object">
          <span class="uml-name">checkins</span><span>: List&lt;{</span>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">start_time</span>: <span class="uml-class">Date</span></div>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">end_time</span>: <span class="uml-class">Date</span></div>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">code</span>: <span class="uml-class">String</span></div>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">manually_activated</span>: <span class="uml-class">Boolean</span></div>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">activation</span>: <span class="uml-class">String</span></div>
          <div>}&gt;</div>
        </div>
        <div class="uml-line"><span class="uml-name">playback_submission_start_time</span>: <span class="uml-class">Date</span></div>
        <div class="uml-line"><span class="uml-name">playback_submission_end_time</span>: <span class="uml-class">Date</span></div>
        <div class="uml-child-object">
          <span class="uml-name">submission_window_status<span>: {</span></span>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">is_pending</span>: <span class="uml-class">Boolean</span></div>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">is_open</span>: <span class="uml-class">Boolean</span></div>
          <div class="uml-line"><span class="uml-indent"></span><span class="uml-name">is_closed</span>: <span class="uml-class">Boolean</span></div>
          <div>}</div>
        </div>
        <div class="uml-line"><span class="uml-name">video_ref</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">video_length</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">video_type</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">num_playback_polls</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">email_sent</span>: <span class="uml-class">Boolean</span></div>
        <div class="uml-line"><span class="uml-name">meeting_link</span>: <span class="uml-class">String</span></div>
      </div>
      <div class="uml-methods">

      </div>
    </div>
    <div id="uml-lecture-submission" class="uml-object">
      <div class="uml-object-name">Lecture Submission</div>
      <div class="uml-variables">
        <div class="uml-line"><span class="uml-name">lecture</span>: <span class="uml-class">ObjectID</span></div>
        <div class="uml-line"><span class="uml-name">submitter</span>: <span class="uml-class">ObjectID</span></div>
        <div class="uml-line"><span class="uml-name">codes</span>: <span class="uml-class">List&lt;String&gt;</span></div>
        <div class="uml-line"><span class="uml-name">live_progress</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">live_percent</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">video_progress</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">video_percent</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">student_poll_answers</span>: <span class="uml-class">Object</span></div>
        <div class="uml-line"><span class="uml-name">live_submission_time</span>: <span class="uml-class">Date</span></div>
        <div class="uml-line"><span class="uml-name">playback_submission_time</span>: <span class="uml-class">Date</span></div>
      </div>
      <div class="uml-methods">

      </div>
    </div>
    <div id="uml-playback-poll" class="uml-object">
      <div class="uml-object-name">Playback Poll</div>
      <div class="uml-variables">
        <div class="uml-line"><span class="uml-name">lecture</span>: <span class="uml-class">ObjectID</span></div>
        <div class="uml-line"><span class="uml-name">question</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">possible_answers</span>: <span class="uml-class">List&lt;String&gt;</span></div>
        <div class="uml-line"><span class="uml-name">correct_answers</span>: <span class="uml-class">List&lt;String&gt;</span></div>
        <div class="uml-line"><span class="uml-name">checkin</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">code</span>: <span class="uml-class">String</span></div>
        <div class="uml-line"><span class="uml-name">timestamp</span>: <span class="uml-class">Number</span></div>
        <div class="uml-line"><span class="uml-name">student_poll_answers</span>: <span class="uml-class">Object</span></div>
        <div class="uml-line"><span class="uml-name">live_submission_time</span>: <span class="uml-class">Date</span></div>
        <div class="uml-line"><span class="uml-name">playback_submission_time</span>: <span class="uml-class">Date</span></div>
      </div>
      <div class="uml-methods">

      </div>
    </div>
    <svg class="uml-lines" id="1">
      <line x1="30%" y1="65%" x2="35%" y2="65%"/>
      <line x1="35%" y1="65%" x2="35%" y2="35%"/>
      <line x1="35%" y1="35%" x2="40%" y2="35%"/>
    </svg>
    <svg class="uml-lines" id="2">
      <line x1="30%" y1="75%" x2="32.5%" y2="75%"/>
      <line x1="32.5%" y1="75%" x2="32.5%" y2="100%"/>
    </svg>
    <svg class="uml-lines2" id="2">
      <line x1="32.5%" y1="0%" x2="32.5%" y2="5%"/>
      <line x1="32.5%" y1="5%" x2="35%" y2="5%"/>
    </svg>
    <svg class="uml-lines" id="3">
      <line x1="50%" y1="49.5%" x2="50%" y2="65%"/>
      <line x1="50%" y1="65%" x2="45%" y2="65%"/>
      <line x1="45%" y1="65%" x2="45%" y2="80%"/>
    </svg>
    <svg class="uml-lines" id="4">
      <line x1="55%" y1="85%" x2="60%" y2="85%"/>
    </svg>
    <svg class="uml-lines3" id="5">
      <line x1="70%" y1="4%" x2="70%" y2="13%"/>
      <line x1="58%" y1="13%" x2="70%" y2="13%"/>
      <line x1="58%" y1="20%" x2="58%" y2="13%"/>
      <line x1="82%" y1="13%" x2="70%" y2="13%"/>
      <line x1="82%" y1="20%" x2="82%" y2="13%"/>
    </svg>
  </div>
</template>

<script>

  export default {
    name: 'UMLDiagram'
  }

</script>

<style>
.uml-object {
  font-size: 0.9rem;
  text-align: left;
  font-family: "Exo";
  color: var(--dashboard-text-color);
  border-radius: 0.25rem;
  background: #73AD21;
  box-shadow: 2px 2px black;
  width: 20%;
}
.uml-variables {
  margin: .5rem .5rem .5rem .5rem;
  padding: .5rem .5rem .5rem .5rem;
  border-radius: 0.25rem;
  background: white;
  box-shadow: inset 0 0 2px black;
}
.uml-indent {
  margin-left: 2em;
}
.uml-object-name {
  margin: .5rem .5rem .5rem 1rem;
  font-family: "Exo";
  font-weight: bold;
  font-size: x-large;
  color: #6363bb;
}
.uml-name {
  font-family: "Exo";
  font-weight: bold;
  color: #0090c0;
}
.uml-class {
  font-family: "monospace";
  color: mediumpurple;
}
.uml-lines,
.uml-lines2,
.uml-lines3{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  stroke: seashell;
  stroke-width: 2;
}
.uml-lines2 {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
}
.uml-lines3 {
  position: absolute;
  top: 200%;
  left: 0;
  width: 100%;
  height: 100%;
}
#uml-user {
  position: absolute;
  top: 20%;
  left: 10%;
}
#uml-section {
  position: absolute;
  top: 80%;
  left: 35%;
}
#uml-course {
  position: absolute;
  top: 10%;
  left: 40%;
}
#uml-lecture {
  position: absolute;
  top: 70%;
  left: 60%;
}

#uml-lecture-submission {
  position: absolute;
  top: 220%;
  left: 48%;
}

#uml-playback-poll {
  position: absolute;
  top: 220%;
  left: 72%;
}
</style>
