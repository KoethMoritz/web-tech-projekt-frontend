<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from 'vue';

const searchKeyword = ref('');
const recipes = ref([]);

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
    const filteredRecipes = recipes.value.filter(recipe => recipe.name.toLowerCase().includes(keyword));
    console.log('Filtered Recipes:', filteredRecipes);
};

onMounted(() => {
    loadRecipes();
});

watch(searchKeyword, searchRecipes);
</script>

<template>
    <WelcomeItem>
        <template #icon>
            <DocumentationIcon />
        </template>
        <template #heading>Deine Rezepte</template>
        <input type="text" v-model="searchKeyword" placeholder="Search by name" />
    </WelcomeItem>
</template>
