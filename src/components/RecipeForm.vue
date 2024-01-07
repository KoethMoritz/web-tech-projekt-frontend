<template>
    <div>
        <h2>{{ isEditing ? 'Rezept bearbeiten' : 'Neues Rezept hinzufügen' }}</h2>
        <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input type="text" v-model="recipe.name" required />

            <label for="description">Beschreibung:</label>
            <textarea v-model="recipe.description" required></textarea>

            <label for="preparationTime">Zubereitungszeit (Minuten):</label>
            <input type="number" v-model="recipe.preparationTime" required />

            <button type="submit">{{ isEditing ? 'Aktualisieren' : 'Hinzufügen' }}</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const recipe = ref({
    name: '',
    description: '',
    preparationTime: 0
});
const isEditing = ref(false);
const route = useRoute();
const router = useRouter();

const loadRecipeForEditing = () => {
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
            isEditing.value = true;
        })
        .catch((error) => {
            console.error('Error fetching recipe for editing:', error);
        });
};

const submitForm = () => {
    if (isEditing.value) {
        const endpoint = `http://localhost:8080/recipe/${recipe.value.id}`;
        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe.value),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                router.push(`/recipe/${recipe.value.id}`);
            })
            .catch((error) => {
                console.error('Error updating recipe:', error);
            });
    } else {
        const endpoint = 'http://localhost:8080/recipe';
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe.value),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                router.push('/home');
            })
            .catch((error) => {
                console.error('Error adding new recipe:', error);
            });
    }
};

onMounted(() => {
    if (route.name === 'recipeFormEdit') {
        loadRecipeForEditing();
    }
});
</script>
