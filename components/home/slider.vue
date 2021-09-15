<template>
<div class="slider-wrapper">
    <swiper
    :options="swiperOption" 
    class="slider"
    ref="mySwiper" 
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide @click.prevent="$router.push({name : `shop___${i18n.locale}`})" class="slide" v-for="slide in sliders" :key="slide.id" :style="{backgroundImage: `url(${slide.image})`}">
    
    </swiper-slide>
  </swiper>
</div>

</template>

<script>
import swiperOption from '@/utilities/slider.js'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      swiperOption,
      Componentloading : false
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    ...mapGetters({
      loading : 'global/slidersLoading',
      sliders : 'global/sliders',
    })

  },
  
  
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log('slide change');
    },
  },
  created(){
    this.$store.dispatch('global/getSliders')
    .then(() => {
      setTimeout(() => {
          this.Componentloading = false
      }, 1000);
    })
  }
}
</script>

<style scoped>
.slider-wrapper .slide{
  min-height: 30vh;
  background-size: cover;
  background-position: center;
}
@media(min-width : 769px){
  .slider-wrapper .slide{
    height: 60vh;
    cursor: pointer;
  }
}
</style>