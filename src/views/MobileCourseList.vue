<template>
    <div>
        <CourseList />
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
        methods: {
            visibilityChanged (is_visible, entry) {
                if (is_visible) {
                    this.redirectToDashboard()
                }
            },
            redirectToDashboard () {
                console.log(`Should redirect to dashboard router.`)
                this.$router.push({ name: 'dashboard' })
            }
        }
    }
</script>
<style>

</style>