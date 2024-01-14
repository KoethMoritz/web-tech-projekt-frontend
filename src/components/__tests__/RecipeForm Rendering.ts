import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RecipeForm from '../components/RecipeForm.vue';

// Dieser Test prüft, ob die RecipeForm-Komponente ordnungsgemäß gerendert wird.
// Er verwendet eine Prop isEditing, um zu simulieren, ob die Komponente im Bearbeitungsmodus ist
// und überprüft dann, ob der erwartete Inhalt vorhanden ist.
describe('RecipeForm', () => {
    it('renders properly', () => {
        const wrapper = mount(RecipeForm, { props: { isEditing: false } });
        expect(wrapper.html()).toContain('New Recipe Form content');
    });
});
