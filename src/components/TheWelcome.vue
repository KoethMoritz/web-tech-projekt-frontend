<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import {RouterLink} from "vue-router";

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Deine Rezepte</template>
      <RouterLink :to="{ name: 'recipeDetails', params: { id: 1 } }">RecipeDetails</RouterLink>
  </WelcomeItem>
</template>
