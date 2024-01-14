<template>
  <div style="color: white;">
    <h2>{{ isEditing ? 'Rezept bearbeiten' : 'Neues Rezept hinzufügen' }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name: </label>
      </div>
      <div>
        <input type="text" v-model="recipe.name" style="width: 300px;" required />
          <p v-if="nameError" style="color: red;">{{ nameError }}</p>
        <p></p>
      </div>
      <div>
        <label for="description">Beschreibung:</label>
      </div>
      <div>
        <textarea v-model="recipe.description" style="width: 1200px; height: 250px;" required></textarea>
          <p v-if="descriptionError" style="color: red;">{{ descriptionError }}</p>
        <p></p>
      </div>
      <div>
        <label for="preparationTime">Zubereitungszeit in Minuten: </label>
      </div>
      <div>
        <input type="number" v-model="recipe.preparationTime" style="width: 75px;" required min="0" />
          <p v-if="preparationTimeError" style="color: red;">{{ preparationTimeError }}</p>
          <p></p>
      </div>

      <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <label :for="'ingredientName' + index">Zutat:</label>
        <input :id="'ingredientName' + index" v-model="ingredient.name" required />
          <p v-if="ingredientNameErrors[index]" style="color: red;">{{ ingredientNameErrors[index] }}</p>

        <label :for="'ingredientQuantity' + index">Menge:</label>
        <input :id="'ingredientQuantity' + index" v-model="ingredient.quantity" required />
          <p v-if="ingredientQuantityErrors[index]" style="color: red;">{{ ingredientQuantityErrors[index] }}</p>

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
const nameError = ref('');
const descriptionError = ref('');
const preparationTimeError = ref('');
const ingredientNameErrors = ref([]);
const ingredientQuantityErrors = ref([]);

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
    if (recipe.value.name.length > 255) {
        nameError.value = 'Der Name darf nicht mehr als 255 Zeichen haben.';
        return;
    } else {
        nameError.value = '';
    }
    if (recipe.value.description.length > 100000) {
        descriptionError.value = 'Die Beschreibung darf nicht mehr als 100.000 Zeichen haben.';
        return;
    } else {
        descriptionError.value = '';
    }
    if (recipe.value.preparationTime > 1000000) {
        preparationTimeError.value = 'Die Zubereitungszeit darf nicht mehr als 1.000.000 Minuten betragen.';
        return;
    } else {
        preparationTimeError.value = '';
    }
    recipe.value.ingredients.forEach((ingredient, index) => {
        if (ingredient.name.length > 255) {
            ingredientNameErrors.value[index] = 'Der Zutaten-Name darf nicht mehr als 255 Zeichen haben.';
        } else {
            ingredientNameErrors.value[index] = '';
        }

        if (ingredient.quantity.length > 255) {
            ingredientQuantityErrors.value[index] = 'Die Zutaten-Menge darf nicht mehr als 255 Zeichen haben.';
        } else {
            ingredientQuantityErrors.value[index] = '';
        }
    });

    if (ingredientNameErrors.value.some(error => error !== '') ||
        ingredientQuantityErrors.value.some(error => error !== '')) {
        return;
    }
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
        showCancelConfirmation.value = true;
};

const confirmCancel = () => {
  showCancelConfirmation.value = false;
  if (isEditing.value) {
      const recipeId = route.params.id;
      router.push(`/recipe/${recipeId}`)
    } else {
      router.push(`/`);
  }

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