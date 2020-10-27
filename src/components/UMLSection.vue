<template>
    <div class="uml-section-view">
        <div class="uml-section">
            <div class="uml-section-bg"></div>
            <div class="uml-section-fg">
                <div class="uml-section-info">
                    <span class="uml-section-course-prefix">{{ course.prefix }}</span>
                    <span class="uml-section-course-suffix">{{ course.suffix }}&nbsp;</span>
                    <span class="uml-section-course-name">{{ course.name }}&nbsp;</span>
                    <span class="uml-section-name">{{ section.name }}</span>
                </div>
                <div class="uml-select-list">
                    <div v-if="selected !== 'TA'" class="uml-tas-inline"
                         v-on:click="select('TA')">
                        List TAs:
                    </div>
                    <div v-if="selected === 'TA'" class="uml-tas-list"
                         v-on:click="select('')">
                        <div class="uml-ta-label">
                            TAs:
                        </div>
                        <UMLUserList :user-list="TAs"/>
                    </div>
                    <div v-if="selected !== 'student'" class="uml-students-inline"
                         v-on:click="select('student')">
                        List Students:
                    </div>
                    <div v-if="selected === 'student'" class="uml-students-list"
                         v-on:click="select('')">
                        <div class="uml-students-label">
                            Students:
                        </div>
                        <!--<UMLUserList :user-list="students"/>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="uml-padding"></div>
        <div class="uml-section-course" v-if="!child">
            <UMLcourse :course="course" :child="true"/>
        </div>
    </div>

</template>

<script>
    import CourseAPI from "@/services/CourseAPI.js";
    import SectionAPI from "@/services/SectionAPI";
    import UMLcourse from "./UMLCourse";
    import UMLUserList from "./UMLUserList";
    import UserAPI from "@/services/UserAPI";
    export default {
        name: "UMLSection",
        props: {
            section: Object,
            course: Object,
            child: Boolean // only when extending from course
        },
        computed: {},
        components: {UMLcourse},
        data() {},
        created() {
            this.TAs = [];
            this.students = [];
            this.selected = "";
            this.getTAs();
            this.getStudents();
            this.getCourse();
        },
        methods: {
            async getTAs() {
                for (const v of this.section.teaching_assistants) {
                    let ta = await UserAPI.getUser(v);
                    if (ta.data != null) {
                        this.TAs.push(ta.data);
                    }
                }
            },
            async getStudents() {
                for (const v of this.section.students) {
                    let student = await UserAPI.getUser(v);
                    if (student.data != null) {
                        this.students.push(student.data);
                    }
                }
            },
            async getCourse(){
                let course = await SectionAPI.getCourse(this.section._id);
                this.course = course.data;
                this.course_prefix = course.data.prefix;
                this.course_suffix = course.data.suffix;
                this.course_name = course.data.name;
            },
            select(i){
                this.selected = i;
            }
        }
    };
</script>

<style scoped>
    .uml-section-bg {
        width: 55%;
        margin-left: 0;
        border-radius: 5px;
        -webkit-transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
        -ms-transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
        transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
        box-shadow: 0px 3px 3px 1px rgba(109, 109, 109, 0.644);
    }
    .uml-section-fg {
        position: absolute;
        width: 50%;
        margin-top: -3.5rem;
        margin-left: 1.7%;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0px 3px 3px 1px rgba(109, 109, 109, 0.644);
        z-index: 4;
    }
    .uml-section-name {
        margin-right: 2em;
    }
    .uml-first-name {
        margin-right: 0;
    }
    .uml-last-name {
    }
    .uml-email {
        margin-right: 2em;
    }
    .uml-is-admin {
    }
    .uml-select-list {
    }
    .uml-instructor-courses-inline{
        cursor: pointer;
    }
    .uml-student-sessions-inline {
        cursor: pointer;
    }
    .uml-tas-inline {
        cursor: pointer;
    }
    .uml-students-inline {
        cursor: pointer;
    }
    .uml-padding{
        height: 100px;
    }
</style>
