<template>
    <div>
        <h2>Rezeptdetails</h2>
        <div v-if="recipe && !deletionConfirmed">
            <h3>{{ recipe.name }}</h3>
            <p>ID: {{ recipe.id }}</p>
            <p>Beschreibung: {{ recipe.description }}</p>
            <p>Zubereitungszeit: {{ recipe.preparationTime }} Minuten</p>
            <button v-if="!confirmDelete" @click="confirmDelete = true">Rezept löschen</button>
            <button @click="editRecipe">Rezept bearbeiten</button>
            <div v-if="confirmDelete">
                <p style="color: red;">Sind Sie sich sicher, dass Sie das Rezept löschen wollen?</p>
                <button @click="deleteRecipe">Ja, löschen</button>
                <button @click="confirmDelete = false">Abbrechen</button>
            </div>
        </div>
        <div v-else>
            <p style="color: darkgreen;">Das Rezept wurde gelöscht oder existiert nicht.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const recipe = ref(null);
const confirmDelete = ref(false);
const deletionConfirmed = ref(false);
const route = useRoute();
const router = useRouter();

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

const deleteRecipe = () => {
    const recipeId = route.params.id;
    const endpoint = `http://localhost:8080/recipe/${recipeId}`;
    confirmDelete.value = false;
    deletionConfirmed.value = true;
    fetch(endpoint, { method: 'DELETE' })
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
            console.error('Error deleting recipe:', error);
        });
};

const editRecipe = () => {
    router.push(`/recipe-form/${recipe.value.id}`);
};

onMounted(() => {
    loadRecipe();
});
</script>
