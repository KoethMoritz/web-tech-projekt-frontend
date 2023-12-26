<template>
    <div>
        <h2>Rezept hinzufügen</h2>
        <form @submit.prevent="saveRecipe">
            <div>
                <label for="recipeName">Rezeptname:</label>
            </div>
            <div>
                <input v-model="nameField" type="text" id="recipeName" required />
            </div>

            <div>
                <label for="recipeDescription">Beschreibung:</label>
            </div>
            <div>
                <textarea v-model="descriptionField" id="recipeDescription" required></textarea>
            </div>

            <button type="submit">Rezept speichern</button>
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
