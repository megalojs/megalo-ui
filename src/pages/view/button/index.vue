<template>
  <div class="page">
    <doc-header title="Button 按钮"></doc-header>
    <div class="doc-body">
      <mgButton :size="size" :loading="loading" :plain="plain" :disabled="disabled" type="default" @click="handleClick">default</mgButton>
      <mgButton :size="size" :loading="loading" :plain="plain" :disabled="disabled" type="primary" @click="handleClick">primary</mgButton>
      <mgButton :size="size" :loading="loading" :plain="plain" :disabled="disabled" type="warn" @click="handleClick">warn</mgButton>
      <mgButton :plain="true" @click="disabled = !disabled">点击设置以上按钮disabled属性</mgButton>
      <mgButton :plain="true" @click="plain = !plain">点击设置以上按钮plain属性</mgButton>
      <mgButton :plain="true" @click="loading = !loading">点击设置以上按钮loading属性</mgButton>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import mgButton from '../../../components/button';
  export default {
    components: {
      docHeader,
      mgButton
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
      handleClick(e) {
        console.log(e);
        this.size = this.size === 'mini' ? 'default' : 'mini'
      }
    }
  }
</script>

<style lang="scss">
</style>