<template>
    <v-app>
        <RouterView />
    </v-app>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { router } from '../../router/index';
onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
        router.push('/');
    }
});
</script>
