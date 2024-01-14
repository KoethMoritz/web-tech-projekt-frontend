import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';

// Hier wird die Navigation überprüft. Der Test montiert die Haupt-App-Komponente und
// simuliert dann das Klicken auf einen Link (z.B. den "About"-Link).
// Anschließend wird überprüft, ob die gerenderte Ausgabe die erwarteten Inhalte der verknüpften Ansicht enthält.
describe('Navigation Links', () => {
    it('navigates to AboutView when About link is clicked', async () => {
        const wrapper = mount(App);
        await wrapper.find('[to="/about"]').trigger('click');
        expect(wrapper.text()).toContain('AboutView content');
    });
});
