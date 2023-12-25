<template>
    <div>
        <h2>Rezeptdetails</h2>
        <div v-if="recipe">
            <h3>{{ recipe.name }}</h3>
            <p>ID: {{ recipe.id }}</p>
            <p>Beschreibung: {{ recipe.description }}</p>
        </div>
        <div v-else>
            <p>Rezept nicht gefunden.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const recipe = ref(null);
const route = useRoute();

const loadRecipe = () => {
    const recipeId = route.params.id;
    const endpoint = `http://localhost:8080/recipe/${recipeId}`;
    fetch(endpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            recipe.value = data;
        })
        .catch((error) => {
            console.error('Error fetching recipe:', error);
        });
};

onMounted(() => {
    loadRecipe();
});
</script>
