<template>
    <div class="uml-userlist-view">
        <div class="uml-userlist" v-if="user_list.length > 0">
            <span class="uml-userlist-username" v-for="(user, index) in user_list" :key="index"
                v-on:click="select_user(index)">
                {{user.name}}&nbsp;
            </span>
            <UMLUser :user="user_list[selected]" :is_child="true"/>
        </div>
    </div>
</template>

<script>
    import UMLUser from "./UMLUser";
    export default {
        name: "UMLUserList",
        components: {UMLUser},
        props:{
            user_list:Object
        },
        created() {
            this.selected = 0;
        },
        methods:{
            select_user(i){
                this.selected = i;
            }
        }
    }

</script>

<style scoped>

</style>