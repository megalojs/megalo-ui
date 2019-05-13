<template>
  <div class="page">
    <doc-header title="Form 表单"></doc-header>
    <div class="doc-body">
      <mgForm :reportSubmit="true" @submit="handleSubmit" @reset="handleReset">
        <p><label>name</label><input style="border: 1px solid #333;" type="text" name="name"></p>
        <p><label>age</label><input style="border: 1px solid #333;" type="text" name="age"></p>
        <mgButton form-type="submit">提交</mgButton>
        <mgButton form-type="reset">重置</mgButton>
      </mgForm>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import mgForm from '../../../components/form';
  import mgButton from '../../../components/button';

  export default {
    components: {
      docHeader,
      mgForm,
      mgButton
    },
    data() {
      return {
        loading: false,
        disabled: false,
        size: 'default',
        plain: false
      }
    },
    methods: {
      handleSubmit() {
        alert('submit');
      },
      handleReset() {
        alert('reset');
      }
    }
  }
</script>

<style lang="scss">
</style>