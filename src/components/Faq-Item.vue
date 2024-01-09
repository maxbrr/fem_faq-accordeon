<script setup>
import { ref } from 'vue';
import iconMinus from '@/assets/icon-minus.svg';
import iconPlus from '@/assets/icon-plus.svg';
const { props } = defineProps({
  heading: String,
  textBody: String,
  isActive: Boolean,
  isMarked: Boolean,
});
// const isMarked = ref(props.isMarked);
</script>

<template>
  <div :class="{ 'faq-item': true, 'active': isActive }" >
    <div id="headline" :class="{ 'isMarked': isMarked }">
      <h3 id="heading">{{ heading }}</h3>
      <img :src="isActive ? iconMinus : iconPlus">
    </div>
    <p class="faq-item-text">{{ textBody }}</p>
  </div>  
</template>

<style scoped>
  .faq-item {
    display: grid;
    grid-template-rows: 40px 0;
    gap: 20px;
  }

  .faq-item.active {
    grid-template-rows: 40px auto;
  }

  .faq-item-text {
    overflow: hidden;
  }

  #headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #headline.isMarked {
    color: var(--heading-hover);
  }

  @media (max-width: 375px) {
    #heading {
      font-size: 16px;
    }
    .faq-item-text {
      margin-bottom: 20px;
    }
  }
</style>
