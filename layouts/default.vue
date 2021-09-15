<template>
  <v-app :class="{rtl : $i18n.locale == 'ar'}" dark>
    <v-overlay :value="overlay" v-if="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div v-else>
      <layouts-app-bar/>
      <layouts-app-nav/>
      <v-main>
          <nuxt />
      </v-main>
      <layouts-app-footer/>
      <layouts-bottom-nav/>

      <modals-mobile-categories/>
      <layouts-snack-bar/>
      <modals-add-to-cart/>
    </div>
     
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      loading:true,
      overlay : true,
    }
  },
  
  methods:{
    async init(){
      await this.$store.dispatch('global/getSettings')
      .then(() => {
        this.loading = false
      })
      await this.$store.dispatch('cart/get')
      await this.$store.dispatch('wishlist/get')
    }
  },
  created(){
    this.init()
  }
}
</script>
