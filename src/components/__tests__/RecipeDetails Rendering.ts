import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeDetails from '../components/RecipeDetails.vue';


//Hier wird überprüft, ob die RecipeDetails-Komponente ordnungsgemäß gerendert wird.
// Der Test verwendet eine vordefinierte Rezeptdaten-Prop, um sicherzustellen, dass die Komponente den erwarteten Rezeptnamen anzeigt.
describe('RecipeDetails', () => {
    it('renders properly', () => {
        const wrapper = mount(RecipeDetails, { props: { recipe: { id: 1, name: 'Sample Recipe' } } });
        expect(wrapper.text()).toContain('Sample Recipe');
    });
});
