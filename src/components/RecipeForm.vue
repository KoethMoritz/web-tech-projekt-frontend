<!-- recipeform.vue -->

<template>
    <div>
        <h2>Recipe Form</h2>
        <form @submit.prevent="saveRecipe">
            <label for="recipeName">Recipe Name:</label>
            <input v-model="nameField" type="text" id="recipeName" required />

            <label for="recipeDescription">Description:</label>
            <textarea v-model="descriptionField" id="recipeDescription" required></textarea>

            <button type="submit">Save Recipe</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const nameField = ref('');
const descriptionField = ref('');

const saveRecipe = async () => {
    try {
        const response = await fetch('http://localhost:8080/save-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name: nameField.value,
                description: descriptionField.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Recipe saved:', responseData);

        // Formularfelder leeren
        nameField.value = '';
        descriptionField.value = '';
    } catch (error) {
        console.error('Error saving recipe:', error);
    }
};
</script>
