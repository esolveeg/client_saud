<template>
  <div>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <div v-else>

       
          <div class="showing text-center">
            {{$t('showing')}} {{wishlist.length}}
          </div>
        <div cols="12" v-if="wishlist.length > 0">
          <v-row v-if="wishlist.length > 0">
              <partials-wishlist-product   v-for="(product , index) in wishlist" :key="index" :product="product"/>
          </v-row>
        </div>
        <div v-else cols="12" class="no-products" > 
            <v-icon x-large class="remove-icon">
              mdi-heart-outline
            </v-icon>
            <span class="text-large">{{$t('no_products_wishlist')}}</span>
            <v-btn @click.prevent="$router.push({name : `shop___${$i18n.locale}`})" color="primary">{{$t('continue_shopping')}} <v-icon dark>mdi-arrow-right</v-icon></v-btn>
        </div>
      </div>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed : {
        mobileWishlistModal: {
            get: function() {
				return this.$store.getters['ui/mobileWishlistModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/mobileWishlistModal' , newValue)
            }
        },
        ...mapGetters({
          wishlist: 'wishlist/wishlist',
          loading: 'wishlist/loading',
      })
    },
    data () {
      return {
        sound: true,
        widgets: false,
      }
    },

    created(){
      const payload = { }
      this.$store.dispatch('wishlist/get')
      // console.log(payload)
      // this.$store.dispatch('product/getProducts' ,payload)
    },
    methods:{
        close(){
            console.log('asd')
            this.$store.commit('ui/mobileWishlistModal' , false)
        },
        save(){
            console.log('save')
        }
    }
  }
</script>
<style>
.no-products{
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.remove-icon{
  /* font-size: 200px !important; */
  font-weight:200;
  margin-bottom: 20px;
  color: #000 !important;
}
.no-products .text-large{
  margin-bottom: 20px;
}
.products-wrapper{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.products-wrapper > * {
  /* flex:1 auto */
}
</style>