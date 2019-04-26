<template>
  <div class="page">
    <doc-header title="Form 表单"></doc-header>
    <div class="doc-body">
      <myForm @submit="handleSubmit">
        <myButton form-type="submit">提交</myButton>
        <myButton>按钮</myButton>
      </myForm>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import myForm from '../../../components/form';
  import myButton from '../../../components/button';
  export default {
    components: {
      docHeader,
      myForm,
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
      handleSubmit() {
        alert('submit')
      }
    }
  }
</script>

<style lang="scss">
</style>