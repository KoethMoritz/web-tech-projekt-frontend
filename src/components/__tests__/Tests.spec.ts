import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';
import WelcomeItem from '../WelcomeItem.vue';
import RecipeList from "../RecipeList.vue";
import TheWelcome from "../TheWelcome.vue";
import HomeView from "../../views/HomeView.vue";
import AboutView from "../../views/AboutView.vue";

//Checks if the HelloWorld component renders properly with the provided message ('Hello Vitest').
describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});

// Checks if the WelcomeItem component renders without errors.
describe('WelcomeItem', () => {
  it('renders without errors', () => {
    const wrapper = mount(WelcomeItem);
    expect(wrapper).toBeDefined();
  });

  // Checks if the icon slot is properly rendered when provided.
  it('renders icon', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: '<div class="test-icon"></div>'
      }
    });
    expect(wrapper.find('.test-icon').exists()).toBe(true);
  });

  // Checks if the heading slot is properly rendered when provided.
  it('renders heading', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        heading: 'Test Heading'
      }
    });
    expect(wrapper.text()).toContain('Test Heading');
  });
});

// Checks if the RecipeList component renders without errors.
describe('RecipeList', () => {
  it('renders without errors', () => {
    const wrapper = mount(RecipeList);
    expect(wrapper).toBeDefined();
  });
});

// Checks if the TheWelcome component renders without errors.
describe('TheWelcome', () => {
  it('renders without errors', () => {
    const wrapper = mount(TheWelcome);
    expect(wrapper).toBeDefined();
  });

  // Checks if the search input exists in the rendered component.
  it('renders search input', () => {
    const wrapper = mount(TheWelcome);
    expect(wrapper.find('input').exists()).toBe(true);
  });
});

// Checks if the HomeView component renders without errors.
describe('HomeView', () => {
  it('renders without errors', () => {
    const wrapper = mount(HomeView);
    expect(wrapper).toBeDefined();
  });
});

// Checks if the AboutView component renders without errors.
describe('AboutView', () => {
  it('renders without errors', () => {
    const wrapper = mount(AboutView);
    expect(wrapper).toBeDefined();
  });
});
