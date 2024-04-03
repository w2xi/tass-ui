/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-01-22 16:51:31
 * @LastEditors: Huccct
 * @LastEditTime: 2023-02-06 14:15:27
 */
import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import button from '../src/button.vue';
// The component to test

describe('test Button', () => {
  it('should render slot', () => {
    const wrapper = mount(button, {
      slots: {
        default: 'Hello world'
      }
    });

    // Assert the rendered text of the component
    expect(wrapper.text()).toBe('Hello world');
  });
  it('should have type', () => {
    ['default', 'primary', 'success', 'info', 'danger', 'warning'].forEach(type => {
      const wrapper = mount(button, {
        props: {
          type
        }
      });
      expect(wrapper.classes()).toContain(`tas-button--${type}`);
    });
  });

  it('should have size', () => {
    ['default', 'medium', 'small', 'mini', 'tiny'].forEach(size => {
      const wrapper = mount(button, {
        props: {
          size
        }
      });
      expect(wrapper.classes()).toContain(`tas-button--${size}`);
    });
  });

  it('should have plain', () => {
    const wrapper = mount(button, {
      props: {
        plain: true
      }
    });
    expect(wrapper.classes()).toContain('is-plain');
  });

  it('should have round', () => {
    const wrapper = mount(button, {
      props: {
        round: true
      }
    });
    expect(wrapper.classes()).toContain('is-round');
  });

  it('should have circle', () => {
    const wrapper = mount(button, {
      props: {
        circle: true
      }
    });
    expect(wrapper.classes()).toContain('is-circle');
  });

  it('should be loading', async () => {
    const wrapper = mount(button, {
      props: {
        loading: true
      }
    });
    expect(wrapper.find('.tas-icon-loading').exists()).toBe(true);
    expect(wrapper.classes()).toContain('is-loading');

    await wrapper.setProps({ loading: false });

    expect(wrapper.find('.tas-icon-loading').exists()).toBe(false);
  });

  it('should be disabled', async () => {
    const wrapper = mount(button, {
      props: {
        disabled: true
      }
    });

    expect(wrapper.attributes()).toHaveProperty('disabled');
    expect(wrapper.classes()).toContain('is-disabled');

    await wrapper.setProps({ disabled: false });

    expect(wrapper.attributes()).not.toHaveProperty('disabled');
    expect(wrapper.classes()).not.toContain('is-disabled');
  });

  it('should have icon', () => {
    const wrapper = mount(button, {
      props: {
        icon: 'tas-icon-moon'
      }
    });
    expect(wrapper.find('.tas-icon-moon').exists()).toBe(true);
  });

  it('should autoFocus', () => {
    const wrapper = mount(button, {
      props: {
        autoFocus: true
      }
    });
    expect(wrapper.attributes('autofocus')).toBeTruthy();
  });

  it('should have nativeType', () => {
    ['button', 'submit', 'reset'].forEach(type => {
      const wrapper = mount(button, {
        props: {
          nativeType: type
        }
      });
      expect(wrapper.attributes('type')).toBe(type);
    });
  });

  it('should click', () => {
    const wrapper = mount(button);
    wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should not click when button is disabled', () => {
    const wrapper = mount(button, {
      props: {
        disabled: true
      }
    });
    wrapper.trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('click');
  });
});
