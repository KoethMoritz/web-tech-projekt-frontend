<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Deine Rezepte</template>
    <input type="text" v-model="searchKeyword" placeholder="Search by name" />
    <ul>
      <li v-for="result in searchResults" :key="result.id" style="list-style: none; margin-bottom: 10px;">
        <RouterLink :to="'/recipe/' + result.id" style="color: lightgreen; font-weight: bold; text-decoration: none; font-size: 18px;">
          {{ result.name }}
        </RouterLink>
      </li>
    </ul>
  </WelcomeItem>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from 'vue';

const searchKeyword = ref('');
const recipes = ref([]);
const searchResults = ref([]);

const loadRecipes = async () => {
  try {
    const response = await fetch('http://localhost:8080/recipes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    recipes.value = data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

const searchRecipes = () => {
  const keyword = searchKeyword.value.toLowerCase();
  if (keyword.trim() === '') {
    searchResults.value = [];
  } else {
    searchResults.value = recipes.value.filter(recipe => recipe.name.toLowerCase().includes(keyword));
  }
};

onMounted(() => {
  loadRecipes();
});

watch(searchKeyword, searchRecipes);
</script>