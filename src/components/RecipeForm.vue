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

            <div>
                <label for="preparationTime">Zubereitungszeit (Minuten):</label>
            </div>
            <div>
                <input v-model="preparationTimeField" type="number" id="preparationTime" required />
            </div>

            <button type="submit">Rezept speichern</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const nameField = ref('');
const descriptionField = ref('');
const preparationTimeField = ref('');

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
                preparationTime: preparationTimeField.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Recipe saved:', responseData);

        nameField.value = '';
        descriptionField.value = '';
        preparationTimeField.value = '';
    } catch (error) {
        console.error('Error saving recipe:', error);
    }
};
</script>
