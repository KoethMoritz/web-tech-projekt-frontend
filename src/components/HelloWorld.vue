<script setup lang="ts">
defineProps<{
    msg: string
}>()
</script>

<template>
    <div class="greetings centered-text">
        <h1 class="green fw-bold text-center">{{ msg }}</h1>
    </div>
</template>

<style scoped>
.greetings {
    text-align: center;
}

h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

@media (min-width: 1024px) {
    .greetings {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
