<template>
    <div>
        <h2>{{ isEditing ? 'Rezept bearbeiten' : 'Neues Rezept hinzufügen' }}</h2>
        <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input type="text" v-model="recipe.name" required />

            <label for="description">Beschreibung:</label>
            <textarea v-model="recipe.description" required></textarea>

            <label for="preparationTime">Zubereitungszeit (Minuten):</label>
            <input type="number" v-model="recipe.preparationTime" required min="0" />

            <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
                <label :for="'ingredientName' + index">Zutat:</label>
                <input :id="'ingredientName' + index" v-model="ingredient.name" required />

                <label :for="'ingredientQuantity' + index">Menge:</label>
                <input :id="'ingredientQuantity' + index" v-model="ingredient.quantity" required />

                <img
                    src="@/assets/x.png" style="width: 23px; height: 23px;"
                    alt="Delete"
                    @click="removeIngredient(index)"
                />
            </div>

            <button type="button" @click="addIngredient">Zutat hinzufügen</button>

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
    preparationTime: 0,
    ingredients: []
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

const addIngredient = () => {
    recipe.value.ingredients.push({ name: '', quantity: '' });
};

const removeIngredient = (index) => {
    recipe.value.ingredients.splice(index, 1);
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
            .then((data) => {
                recipe.value.id = data.id;
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
            .then((data) => {
                recipe.value.id = data.id;
                router.push(`/recipe/${recipe.value.id}`);
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
