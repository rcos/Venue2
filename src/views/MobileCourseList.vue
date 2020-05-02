<template>
    <div>
        <div class="course-title-area">
            <div class="course-title">Course Info</div>
            <div class="course-load-count" v-if="course_count > 0">{{course_count}} Courses Loaded</div>
        </div>
        <CourseList :sizeCallback="setCourseSize"/>
        <show-at breakpoint="large">
            <!-- Add a component here that only shows when on desktop view, and i
            it calls a function on mount that redirects to /dashboard -->
            <div v-observe-visibility="visibilityChanged">
                <p>On Desktop View</p>
            </div>
        </show-at>
    </div>
</template>
<script>
    import CourseList from '@/components/CourseList'
    import { ObserveVisibility } from 'vue-observe-visibility'
    import {showAt} from 'vue-breakpoints'

    export default {
        name: 'MobileCourseList',
        directives: {
            ObserveVisibility
        },
        components: {
            CourseList,
            showAt
        },
        data(){
            return {
                course_count: 0
            }
        },
        methods: {
            visibilityChanged (is_visible, entry) {
                if (is_visible) {
                    this.redirectToDashboard()
                }
            },
            setCourseSize (course_count) {
                this.course_count = course_count
            },
            redirectToDashboard () {
                console.log(`Should redirect to dashboard router.`)
                this.$router.push({ name: 'dashboard' })
            }
        }
    }
</script>
<style>
    .course-title-area {
        text-align: left;
        width: 80%;
        margin: 4rem auto 0 auto;
    }
    
    .course-title-area .course-title {
        font-weight: bold;
        font-size: 1.5rem;
        color: #2c3e50;
    }

    .course-load-count {
        color: rgba(87, 140, 171, 0.8);
        font-size: 1.2rem;
        margin-left: 0.9rem;
    }

    .course-title-area div {
        display: inline-block;
    }
</style>