<template>
<div>
  <no-ssr>

    <swiper
      :options="swiperOption" 
      v-show="!Componentloading"
      ref="mySwiper" 
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="product in products" :key="product.id">
      <partials-product :product="product" :loading="loading"/>
      </swiper-slide>
    </swiper>
  </no-ssr>
  <v-skeleton-loader
      v-if="Componentloading"
      width="100%"
      type="image"
    >
  </v-skeleton-loader>

</div>
</template>

<script>
import swiperOption from '@/utilities/swiper.js'
import { mapGetters } from 'vuex'
export default {
  name: 'carrousel',
  props : ['productKey'],
    data() {
      return {
        Componentloading : true,
        products : [],
        productsLoading : true,
        swiperOption,
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      ...mapGetters({
        loading: 'product/homeLoading',
      })

    },
    
    mounted() {
      setTimeout(() => {
        this.Componentloading = false
      }, 1500);
      // this.swiper.slideTo(3, 1000, false)
    },

    created(){
      this.$store.dispatch('product/getHomeProducts' , this.productKey)
      .then(res => {
        this.products = res
        this.productsLoading = false
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
   
};
</script>

<style scoped>
.swiper-pagination-bullet.swiper-pagination-bullet-active::after {
  width:100%
}
</style>