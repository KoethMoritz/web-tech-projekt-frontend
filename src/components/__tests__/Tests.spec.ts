import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';
import WelcomeItem from '../WelcomeItem.vue';
import RecipeList from "../RecipeList.vue";
import TheWelcome from "../TheWelcome.vue";
import HomeView from "../../views/HomeView.vue";
import AboutView from "../../views/AboutView.vue";

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});

describe('WelcomeItem', () => {
  it('renders without errors', () => {
    const wrapper = mount(WelcomeItem);
    expect(wrapper).toBeDefined();
  });

});

describe('TheWelcome', () => {
    it('renders without errors', () => {
      const wrapper = mount(TheWelcome);
      expect(wrapper).toBeDefined();
    });

});

describe('HomeView', () => {
  it('renders without errors', () => {
    const wrapper = mount(HomeView);
    expect(wrapper).toBeDefined();
  });

});

describe('AboutView', () => {
  it('renders without errors', () => {
    const wrapper = mount(AboutView);
    expect(wrapper).toBeDefined();
  });

});



