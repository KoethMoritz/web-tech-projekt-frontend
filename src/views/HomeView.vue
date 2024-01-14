<template>
    <div class="centered-container">
        <div class="centered-text">
            {{ msg }}
        </div>
    </div>
    <main>
        <TheWelcome />
    </main>
</template>

<style scoped>
.centered-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.centered-text {
    text-align: center;
}
</style>

<script setup>
defineProps(['msg']);
import TheWelcome from '../components/TheWelcome.vue';
</script>
