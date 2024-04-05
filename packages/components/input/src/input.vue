<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-02-10 11:26:22
 * @LastEditors: Huccct
 * @LastEditTime: 2023-02-10 14:46:01
-->
<template>
  <div class="tas-input" :class="styleClass">
    <input
      ref="ipt"
      class="tas-input__inner"
      :class="{ ['tas-input--prefix']: isShowPrefixIcon }"
      placeholder="请输入内容"
      :value="inputProps.modelValue"
      :disabled="inputProps.disabled"
      v-bind="attrs"
      @input="changeInputVal"
    />
    <div
      v-if="inputProps.clearable && isClearAbled"
      v-show="isEnter"
      class="tas-input__suffix"
      @click="clearValue"
    >
      <tass-icon name="cross"></tass-icon>
    </div>
    <div v-show="isShowEye" class="tas-input__suffix">
      <tass-icon :name="eyeIcon" @click="changeType" />
    </div>
    <div v-if="isShowPrefixIcon" class="tas-input__prefix">
      <tass-icon :name="inputProps.prefixIcon" />
    </div>
    <div v-if="isShowSuffixIcon" class="tas-input__suffix no-cursor">
      <tass-icon :name="inputProps.suffixIcon" />
    </div>
  </div>
</template>
<script setup lang="ts" name="TassInput">
  import '../style/';
  import { computed, ref, useAttrs } from 'vue';
  import TassIcon from '../../icon/src/icon.vue';

  const attrs = useAttrs();
  interface InputProps {
    modelValue?: string | number;
    disabled?: boolean;
    clearable?: boolean;
    size?: string;
    showPassword?: boolean;
    prefixIcon?: string;
    suffixIcon?: string;
  }
  const isClearAbled = ref(false);
  interface InputEmits {
    (e: 'update:modelValue', value: string): void;
  }
  const inputProps = withDefaults(defineProps<InputProps>(), {
    modelValue: ''
  });
  const isEnter = ref(true);
  const ipt = ref();
  Promise.resolve()
    .then(() => {
      if (inputProps.showPassword) {
        ipt.value.type = 'password';
      }
    })
    .catch(e => {
      console.log(e);
    });
  const eyeIcon = ref('EyeClosed');
  const isShowEye = computed(() => {
    return inputProps.showPassword && inputProps.modelValue && !inputProps.clearable;
  });
  const changeType = () => {
    if (ipt.value.type === 'password') {
      eyeIcon.value = 'eye';
      ipt.value.type = attrs.type || 'text';
      return;
    }
    ipt.value.type = 'password';
    eyeIcon.value = 'EyeClosed';
  };
  const isShowSuffixIcon = computed(() => {
    return inputProps.suffixIcon && !inputProps.clearable && !inputProps.showPassword;
  });
  const isShowPrefixIcon = computed(() => {
    return inputProps.prefixIcon;
  });
  const clearValue = () => {
    inputEmits('update:modelValue', '');
    isClearAbled.value = false;
  };
  const inputEmits = defineEmits<InputEmits>();
  const changeInputVal = (event: Event) => {
    //可清除clearable
    (event.target as HTMLInputElement).value.length
      ? (isClearAbled.value = true)
      : (isClearAbled.value = false);

    inputEmits('update:modelValue', (event.target as HTMLInputElement).value);
  };

  const styleClass = computed(() => {
    return {
      'is-disabled': inputProps.disabled,
      [`tas-input--${inputProps.size}`]: inputProps.size
    };
  });
</script>
