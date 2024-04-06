/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-01-22 16:51:31
 * @LastEditors: Huccct
 * @LastEditTime: 2023-02-06 14:15:27
 */
import { describe, expect, test, it } from 'vitest';

import { mount } from '@vue/test-utils';
import dialog from '../src/dialog.vue';
// The component to test

describe('dialog', () => {
  test('visible', async () => {
    const wrapper = mount(dialog, {
      attachTo: document.body,
      props: {
        visible: true
      }
    });
    // isVisible() only works correctly if the wrapper is attached to the DOM using attachTo
    expect(wrapper.find('.tas-dialog').isVisible()).toBe(true);
    await wrapper.setProps({ visible: false });
    expect(wrapper.find('.tas-dialog').isVisible()).toBe(false);
  });

  test('title', () => {
    const wrapper = mount(dialog, {
      props: {
        visible: true,
        title: 'Dialog title'
      }
    });
    expect(wrapper.find('.tas-dialog__title').text()).toContain('Dialog title');
  });

  test('width', () => {
    const wrapper = mount(dialog, {
      props: {
        visible: true,
        width: '300px'
      }
    });
    expect(wrapper.find('.tas-dialog__box').attributes('style')).toContain('300px');
  });

  test('default slot', () => {
    const slots = {
      default: 'Default slot',
      headerContent: 'header slot',
      footerContent: 'footer slot'
    };
    Object.keys(slots).forEach(key => {
      const wrapper = mount(dialog, {
        props: {
          visible: true
        },
        slots: {
          [key]: slots[key as keyof typeof slots]
        }
      });
      expect(wrapper.html()).toContain(slots[key as keyof typeof slots]);
    });
  });
});
