<!--
 * @Descripttion: Spicy chicken
 * @Author: YuShu Xiao
 * @Date: 2023-02-01 23:03:26
 * @LastEditors: YuShu Xiao
 * @LastEditTime: 2023-02-09 20:27:44
-->
<template>
  <!-- 提示框组件 -->
  <transition name="tas-alert-fade">
    <div v-if="isShow" :class="alertClassNames" class="tas-alert">
      <tass-icon v-if="showIcon" :name="iconName" class="tas-alert__icon" />
      <div class="tas-alert__content">
        <h3 class="tas-alert__title tas-global-ellipsis">
          {{ title }}
        </h3>
        <p v-if="content" class="tas-alert__desc">
          {{ content }}
        </p>
        <tass-icon
          v-if="closeable"
          name="cross"
          class="tas-alert__close-btn"
          @click="handltaslose"
        />
      </div>
    </div>
  </transition>
</template>
<script lang="ts" name="TassAlert" setup>
  import '../style/';
  import type { AlertType } from './interface';
  import { computed, ref } from 'vue';
  import TassIcon from '../../icon';

  const isShow = ref(true);
  const props = defineProps({
    type: {
      type: String,
      default: () => 'info',
      validator: (val: AlertType) => ['info', 'success', 'error', 'warning'].includes(val)
    },
    title: {
      type: String,
      default: '请绑定title'
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    closeable: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(['close']);
  const alertClassNames = computed(() => {
    const { type, center } = props;
    return [{ [`tas-alert--${type}`]: type }, { 'is-center': center }];
  });
  type IiconMaps = Record<string, string>;
  const iconMaps: IiconMaps = {
    info: 'info',
    success: 'success',
    error: 'danger',
    warning: 'warning'
  };
  const iconName = computed(() => {
    const { type } = props;
    return iconMaps[type];
  });
  // 关闭alert
  const handltaslose = () => {
    isShow.value = false;
    emit('close');
  };
</script>
