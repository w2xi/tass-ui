/*
 * @Author: 申恒杰
 * @Date: 2023-02-13 16:01:33
 * @Description: 铁沸物
 * @FilePath: \tass-ui\packages\components\alert\__tests__\alert.test.ts
 */
import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import alert from '../src/alert.vue';
import icon from '../../icon/src/icon.vue';
// The component to test

describe('test alert', () => {
  it('should exist', () => {
    const wrapper = mount(alert);
    expect(wrapper.find('.tas-alert').exists()).toBe(true);
  });

  it('should have type', () => {
    ['info', 'success', 'error', 'warning'].forEach(type => {
      const wrapper = mount(alert, {
        props: {
          type
        }
      });
      expect(wrapper.find('.tas-alert').classes()).toContain(`tas-alert--${type}`);
    });
  });

  it('should have title', () => {
    const wrapper = mount(alert, {
      props: {
        title: 'Title'
      }
    });
    expect(wrapper.find('.tas-alert__title').text()).toBe('Title');
  });

  it('should have content', () => {
    const wrapper = mount(alert, {
      props: {
        content: 'Content'
      }
    });
    expect(wrapper.find('.tas-alert__desc').text()).toBe('Content');
  });

  it('should showIcon', () => {
    const wrapper = mount(alert, {
      props: {
        showIcon: true
      }
    });
    expect(wrapper.find('.tas-alert__icon').exists()).toBe(true);
  });

  it('should showIcon with type', () => {
    const iconMaps: Record<string, string> = {
      info: 'info',
      success: 'success',
      error: 'danger',
      warning: 'warning'
    };
    Object.keys(iconMaps).forEach(type => {
      const wrapper = mount(alert, {
        props: {
          showIcon: true,
          type
        }
      });
      expect(wrapper.getComponent(icon).vm.name).toBe(iconMaps[type]);
    });
  });

  it('should be center', () => {
    const wrapper = mount(alert, {
      props: {
        center: true
      }
    });
    expect(wrapper.find('.tas-alert').classes()).toContain('is-center');
  });

  it('should be closeable', async () => {
    const wrapper = mount(alert, {
      props: {
        closeable: true
      }
    });
    await wrapper.find('.tas-alert__close-btn').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.find('.tas-alert').exists()).toBe(false);
  });
});
