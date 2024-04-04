import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import icon from '../src/icon.vue';

describe('icon', () => {
  it('should render', () => {
    const wrapper = mount(icon, {
      props: {
        name: 'moon'
      }
    });
    expect(wrapper.classes()).toContain('tas-icon-moon');
  });
});
