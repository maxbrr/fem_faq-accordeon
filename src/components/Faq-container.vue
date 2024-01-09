<script setup>
import { ref, onBeforeMount } from 'vue';
import FaqItem from './Faq-Item.vue';
import faqDataJSON from '../assets/data.json';
const faqData = ref(faqDataJSON);
const noHover = ref(true);

const toggleActive = (index) => {
  for(let i = 0; i < faqData.value.length; i++) {
    if(i == index) {
      faqData.value[i].isActive = !faqData.value[i].isActive;
    } else {
      faqData.value[i].isActive = false;
    }
  }
}

const markedIndex = () => {
  let markedIndex = null;
  for(let x = 0; x < faqData.value.length; x++) {
    if(faqData.value[x].isMarked) { markedIndex = x; }
  }
  return markedIndex;
}

const markFirst = () => {
  faqData.value.forEach((el) => { el.isMarked = false });
  faqData.value[0].isMarked = true;
  return;
}

const markNext = () => {
  const currentIndex = markedIndex();
  if(currentIndex === null || currentIndex == faqData.value.length - 1) {
    markFirst();
    return;
  } else if(currentIndex < faqData.value.length - 1) {
    faqData.value[currentIndex].isMarked = false;
    faqData.value[currentIndex + 1].isMarked = true;
    return;
  }
}

const markPrevious = () => {
  const currentIndex = markedIndex();
  if(currentIndex === null) {
    markFirst();
    return
  }
  if(currentIndex === 0) {
    faqData.value[0].isMarked = false;
    faqData.value[faqData.value.length - 1].isMarked = true;
    return;
  }
  if(currentIndex > 0) {
    faqData.value[currentIndex].isMarked = false;
    faqData.value[currentIndex - 1].isMarked = true;
    return;
  }
}

const expandMarkedItem = () => {
  const currentIndex = markedIndex();
  if(currentIndex != null) {
    toggleActive(currentIndex);
  }
}

const removeMark = () => {
  faqData.value.forEach((el) => {
    el.isMarked = false;
  });
}

onBeforeMount(() => {
  document.addEventListener("keydown", function(event) {
    if(event.key === "ArrowUp") {
      markPrevious();
    } else if(event.key === "ArrowDown") {
      markNext();
    } else if(event.key === "Spacebar" || event.key === " ") {
      expandMarkedItem();
    }
  });
});
</script>

<template>
  <div id="faq-container">
    <div id="navigation-hint">
      You can use the arrow keys and the spacebar for keyboard navigation
    </div>
    <div id="container-heading">
      <img src="../assets/icon-star.svg" height="50px">
      <h1>FAQs</h1>
    </div>
    <FaqItem v-for="(item, index) in faqData" 
      :key="index" 
      :heading="item.heading" 
      :textBody="item.textBody" 
      :isActive="item.isActive" 
      :isMarked="item.isMarked"
      @click="toggleActive(index); removeMark()"
    />
  </div>  
</template>

<style scoped>
#faq-container {
  background-color: rgb(255, 255, 255);
  width: 740px;
  height: 600px;
  border-radius: 4mm;
  padding: 40px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 5px rgb(211, 211, 211);
}

#container-heading {
  display: flex;
  align-items: center;
  margin-bottom: 46px;
}

#container-heading h1 {
  margin-left: 10px;
  font-size: 40px;
  font-weight: 700;
  color: var(--heading-main);
}

#navigation-hint {
  width: 300px;
  height: 50px;
  border: 2px solid black;
  border-top: none;
  border-radius: 0mm 0mm 4mm 4mm;
  background-color: var(--background-color);
  color: var(--heading-main);
  font-weight: 600;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  animation: slideInAndOut 5s ease-in-out forwards;
}

@media (max-width: 375px) {
  #faq-container {
    width: 320px;
    height: 600px;
    padding: 40px;
  }

  #container-heading {
    margin-bottom: 20px;
  }

  #container-heading h1 {
    font-size: 30px;
  }

  #navigation-hint {
    display: none;
  }
}

@keyframes slideInAndOut {
  0%, 100% { top: -125px; }
  10%, 90% { top: 0px; }
}
</style>
