<template>
  <v-row justify="center">
    <v-dialog
      v-model="mobileWishlistModal"
      fullscreen
      hide-overlay
      transition="slide-x-transition"
    > 
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <v-card v-else>
        <v-toolbar
          color="primary"
          dark
        >
          <v-btn
            icon
            @click.prevent="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title calss="text-white">{{$t('wishlist')}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-col cols="12" v-if="wishlist.length > 0">
          <div class="showing text-center">
            {{$t('showing')}} {{wishlist.length}}
          </div>
        </v-col>
        <v-col cols="12" v-if="wishlist.length > 0">
          <v-row>
            <v-col cols="6" v-for="(product , index) in wishlist" :key="index">
              <partials-wishlist-product :product="product"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else cols="12" class="no-products" > 
            <v-icon x-large class="remove-icon">
              mdi-heart-outline
            </v-icon>
            <span class="text-large">{{$t('no_products_wishlist')}}</span>
            <v-btn @click.prevent="$router.push({name : `shop___${$i18n.locale}`})" color="primary">{{$t('continue_shopping')}} <v-icon dark>mdi-arrow-right</v-icon></v-btn>
        </v-col>
      </v-card>
    </v-dialog>
  </v-row>
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
.showing{
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 10px 0;
}
</style>