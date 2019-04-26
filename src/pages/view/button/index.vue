<template>
  <div class="page">
    <doc-header title="Button 按钮"></doc-header>
    <div class="doc-body">
      <myButton :size="size" :loading="loading" :plain="plain" :disabled="disabled" type="default" @click="handleClick">default</myButton>
      <myButton :size="size" :loading="loading" :plain="plain" :disabled="disabled" type="primary" @click="handleClick">primary</myButton>
      <myButton :size="size" :loading="loading" :plain="plain" :disabled="disabled" type="warn" @click="handleClick">warn</myButton>
      <myButton :plain="true" @click="disabled = !disabled">点击设置以上按钮disabled属性</myButton>
      <myButton :plain="true" @click="plain = !plain">点击设置以上按钮plain属性</myButton>
      <myButton :plain="true" @click="loading = !loading">点击设置以上按钮loading属性</myButton>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import myButton from '../../../components/button';
  export default {
    components: {
      docHeader,
      myButton
    },
    data() {
      return {
        loading: false,
        disabled: false,
        size: 'default',
        plain: false,
      }
    },
    methods: {
      handleClick() {
        this.size = this.size === 'mini' ? 'default' : 'mini'
      }
    }
  }
</script>

<style lang="scss">
</style>