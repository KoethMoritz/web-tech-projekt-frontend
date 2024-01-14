<template>
  <div style="color: white;">
    <h2>{{ isEditing ? 'Rezept bearbeiten' : 'Neues Rezept hinzufügen' }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name: </label>
      </div>
      <div>
        <input type="text" v-model="recipe.name" style="width: 300px;" required />
        <p></p>
      </div>
      <div>
        <label for="description">Beschreibung:</label>
      </div>
      <div>
        <textarea v-model="recipe.description" style="width: 1200px; height: 250px;" required></textarea>
        <p></p>
      </div>
      <div>
        <label for="preparationTime">Zubereitungszeit in Minuten: </label>
      </div>
      <div>
        <input type="number" v-model="recipe.preparationTime" style="width: 75px;" required min="0" />
        <p></p>
      </div>

      <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <label :for="'ingredientName' + index">Zutat:</label>
        <input :id="'ingredientName' + index" v-model="ingredient.name" required />

        <label :for="'ingredientQuantity' + index">Menge:</label>
        <input :id="'ingredientQuantity' + index" v-model="ingredient.quantity" required />

        <img
            src="@/assets/x.png"
            style="width: 23px; height: 23px;"
            alt="Delete"
            @click="removeIngredient(index)"
        />
      </div>

      <button type="button" @click="addIngredient">Zutat hinzufügen</button>

      <button type="submit">{{ isEditing ? 'Aktualisieren' : 'Hinzufügen' }}</button>

      <button type="button" @click="cancelEdit">Abbrechen</button>
      <p v-if="showCancelConfirmation" style="color: red;">Sind Sie sich sicher, dass Sie die Bearbeitung abbrechen wollen?
        <button @click="confirmCancel">Ja</button>
        <button @click="cancelConfirmation">Nein</button>
      </p>
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
const showCancelConfirmation = ref(false);

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

const cancelEdit = () => {
  if (isEditing.value) {
    showCancelConfirmation.value = true;
  } else {
    const recipeId = route.params.id;
    router.push(`/recipe/${recipeId}`);
  }
};

const confirmCancel = () => {
  showCancelConfirmation.value = false;
  const recipeId = route.params.id;
  router.push(`/recipe/${recipeId}`);
};

const cancelConfirmation = () => {
  showCancelConfirmation.value = false;
};

onMounted(() => {
  if (route.name === 'recipeFormEdit') {
    loadRecipeForEditing();
  }
});
</script>