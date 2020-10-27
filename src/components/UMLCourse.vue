<template>
    <div class="uml-course-view">
        <div class="uml-course">
            <div class="uml-course-bg"></div>
            <div class="uml-course-fg">
                <div class="uml-course-info">
                    <span class="uml-course-course-prefix">{{ course.prefix }}</span>
                    <span class="uml-course-course-suffix">{{ course.suffix }}&nbsp;</span>
                    <span class="uml-course-course-name">{{ course.name }}&nbsp;</span>
                </div>
                <div class="uml-select-list">
                    <div class="uml-instructor-list">
                        <div class="uml-instructor-label">
                            Instructors:
                        </div>
                        <UMLUserList :user-list="instructors"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import CourseAPI from "@/services/CourseAPI.js";
    import SectionAPI from "@/services/SectionAPI";
    import UserAPI from "@/services/UserAPI";
    import UMLUserList from "./UMLUserList";
    export default {
        name: "UMLCourse",
        props: {
            course: Object,
            child: Boolean // unused right now
        },
        computed: {},
        components: {},
        data() {},
        created() {
            this.instructors = [];
            //this.getTAs();
            //this.getStudents();
            this.getInstructors();
        },
        methods: {
            async getInstructors() {
                for (const v of this.section.teaching_assistants) {
                    let i = await UserAPI.getInstructor(v);
                    if (i.data != null) {
                        this.instructors.push(i.data);
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .uml-course-bg {
        width: 55%;
        margin-left: 0;
        border-radius: 5px;
        -webkit-transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
        -ms-transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
        transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
        box-shadow: 0px 3px 3px 1px rgba(109, 109, 109, 0.644);
    }
    .uml-course-fg {
        position: absolute;
        width: 50%;
        margin-top: -3.5rem;
        margin-left: 1.7%;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0px 3px 3px 1px rgba(109, 109, 109, 0.644);
        z-index: 4;
    }
    .uml-course-name {
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
