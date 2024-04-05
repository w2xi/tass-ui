/*
 * @Author: 申恒杰
 * @Date: 2023-02-13 16:10:42
 * @Description: 铁沸物
 * @FilePath: \tass-ui\packages\components\input\__tests__\data-picker.test.ts
 */
import input from '../src/input.vue';

import { describe, test, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';

describe('checkbox', () => {
  test('modelValue should be updated', async () => {
    const wrapper = mount(input, {
      props: {
        modelValue: '1',
        'onUpdate:modelValue': (e: number) => {
          return wrapper.setProps({ modelValue: e });
        }
      }
    });
    await wrapper.find('input').setValue('2');
    expect(wrapper.props('modelValue')).toBe('2');
  });

  test('disabled', async () => {
    const wrapper = mount(input, {
      props: {
        disabled: true
      }
    });
    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.find('.tas-input__inner').attributes()).toHaveProperty('disabled');

    await wrapper.setProps({ disabled: false });

    expect(wrapper.classes()).not.toContain('is-disabled');
    expect(wrapper.find('.tas-input__inner').attributes()).not.toHaveProperty('disabled');
  });

  test('size', () => {
    ['medium', 'mini'].forEach(size => {
      const wrapper = mount(input, {
        props: {
          size
        }
      });
      expect(wrapper.find(`.tas-input--${size}`).exists()).toBe(true);
    });
  });

  test('showPassword', async () => {
    const wrapper = mount(input, {
      props: {
        showPassword: true
      }
    });
    await flushPromises();
    expect(wrapper.find('.tas-input__inner').attributes('type')).toBe('password');
  });

  test('prefixIcon', () => {
    const wrapper = mount(input, {
      props: {
        prefixIcon: true
      }
    });
    expect(wrapper.find('.tas-input__prefix').exists()).toBe(true);
  });

  test('prefixIcon', () => {
    const wrapper = mount(input, {
      props: {
        suffixIcon: true
      }
    });
    expect(wrapper.find('.tas-input__suffix').exists()).toBe(true);
  });
});
