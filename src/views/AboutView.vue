<template>
  <div class="about">
    <h1>{{ counter.count }}</h1>
    <h2 v-if="errors">{{ errors }}</h2>
    <button @click="increment">Увеличить!</button>
    <button @click="decrement">Уменьшить!</button>
  </div>
</template>

<script lang="ts">
import { useCounterStore } from '@/stores/counter'
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup(){
    const counter = useCounterStore();
    const errors = ref('')
    function decrement(){
      if (counter.count > 0) {
        counter.decrement();
        errors.value = ''
        return
      }
      errors.value = 'Счетчик уже на нуле!'
    }
    function increment(){
      counter.increment()
      errors.value = ''
    }
    return {
      counter,
      decrement,
      errors,
      increment
    }
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
