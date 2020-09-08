<template>
  <div class="pageView">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
</script>
<style>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
