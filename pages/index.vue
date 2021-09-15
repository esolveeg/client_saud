<template>
  <v-row justify="center" align="center">
      <v-col cols="12" class="p-0">
        <home-slider/>
      </v-col>
      <v-col cols="12">
        <v-container>
          <v-row justify="center" align="center">
            <!-- <v-col cols="12">
              <div class="d-flex space-between px-4">
                <h4 class="section-header d-inline">{{$t('bestselers')}}</h4>
                <div class="d-inline controllers">
                  <nuxt-link :to="{name : `shop___${$i18n.locale}`}" class=" d-inline underline">{{$t('view_all')}}</nuxt-link>
                </div>
              </div>
              <home-products productKey="bestseller"/>
            </v-col>
            -->
            <v-col cols="12">
              <div class="d-flex space-between px-4">
                <h4 class="section-header d-inline">{{$t('latest_products')}}</h4>
                <div class="d-inline controllers">
                  <nuxt-link :to="{name : `shop___${$i18n.locale}`}" class=" d-inline underline">{{$t('view_all')}}</nuxt-link>
                </div>
              </div>
              <home-products productKey="latest"/>
            </v-col>
             <v-col cols="6" v-for="banner in banners" :key="banner.id">
              <home-banner :loading="bannersLoading" :img="banner.image"/>
            </v-col>
            <v-col cols="12">
              <div class="d-flex space-between px-4">
                <h4 class="section-header d-inline">{{$t('bestseller_products')}}</h4>
                <div class="d-inline controllers">
                  <nuxt-link :to="{name : `shop___${$i18n.locale}`}" class=" d-inline underline">{{$t('view_all')}}</nuxt-link>
                </div>
              </div>
              <home-products productKey="bestseller"/>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
  </v-row>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
  created(){
    this.$store.dispatch('global/getHomeBnners')
    .then(() => {
      setTimeout(() => {
          this.Componentloading = false
      }, 1000);
    })
  },
  computed: {
    ...mapGetters({
      bannersLoading : 'global/bannersLoading',
      banners : 'global/banners',
    })

  },
}
</script>

<style scoped src="@/assets/scss/pages/home.css">