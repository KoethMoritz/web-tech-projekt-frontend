import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeList from '../components/RecipeList.vue';

// Dieser Test stellt sicher, dass die RecipeList-Komponente korrekt gerendert wird.
// Er verwendet eine Prop recipes, um sicherzustellen, dass die Liste der Rezepte in der gerenderten Ausgabe vorhanden ist.
describe('RecipeList', () => {
    it('renders properly', () => {
        const wrapper = mount(RecipeList, { props: { recipes: [{ id: 1, name: 'Recipe 1' }] } });
        expect(wrapper.text()).toContain('Recipe 1');
    });
});
