import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import RecipeDetails from '../components/RecipeDetails.vue';
import RecipeForm from '../components/RecipeForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/recipe/:id',
      name: 'recipeDetails',
      component: RecipeDetails
    },
    {
      path: '/recipe-form/:id',
      name: 'recipeFormEdit',
      component: RecipeForm
    },
    {
      path: '/recipe-form',
      name: 'recipeFormAdd',
      component: RecipeForm
    }
  ]
});

export default router;
