<template>
    <div v-if="course" id="upload-file">
        <h2>Upload New File</h2>
        <form @submit.prevent="uploadFile"></form>

    </div>
</template>
