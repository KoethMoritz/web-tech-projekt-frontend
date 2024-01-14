import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../views/HomeView.vue';


// Dieser Test überprüft, ob die HomeView-Komponente korrekt gerendert wird.
// Der Test sucht nach einem bestimmten Text oder HTML-Inhalt in der gerenderten Ausgabe der Komponente.
describe('HomeView', () => {
    it('renders properly', () => {
        const wrapper = mount(HomeView);
        expect(wrapper.html()).toContain('Your HomeView content');
    });
});
