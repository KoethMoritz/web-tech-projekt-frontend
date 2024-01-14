<template>
  <div style="color: white;">
    <h2>Deine Rezepte:</h2>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id" style="list-style: none; margin-bottom: 10px;">
        <router-link :to="{ name: 'recipeDetails', params: { id: recipe.id }}" style="color: lightgreen; font-weight: bold; text-decoration: none; font-size: 18px;">
          {{ recipe.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const recipes = ref([]);
const route = useRoute();

const loadRecipes = () => {
  fetch('http://localhost:8080/recipes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        recipes.value = data;
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
};


onMounted(() => {
  loadRecipes();
});
</script>
