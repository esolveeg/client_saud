<template>
    <div>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <div class="pr-partial" v-else>
        <div class="img"  >
          <v-img min-height="200" @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" :src="product.ItemImage"></v-img>
          <div class="actions"  v-if="activeCart.includes(product.id) && !product.hasOptions">
            <div class="right d-flex atc items-center py-2">
                <v-icon @click.prevent="changeQty('increase')" small>mdi-plus</v-icon>
                <v-select @change="updateQty" :items="qtys" class="atc-input"  v-model="qty"/>
                <v-icon @click.prevent="changeQty('decrease')" small>mdi-minus</v-icon>
            </div>

          </div>
          <div class="actions" v-else>
             <v-btn
                class="mx-2"
                :class="{active : activeWishlist.includes(product.id) }"
                fab
                dark
                small
                @click.prevent="addToWishlist()"
                color="primary"
              >
                <v-icon dark>
                  mdi-heart
                </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                :class="{active : activeCart.includes(product.id)}"
                fab
                dark
                small
                @click.prevent="addToCart()"
                color="primary"
              >
                <v-icon dark>
                  mdi-cart-arrow-down
                </v-icon>
              </v-btn>
          </div>
        </div>
        <div class="meta text-center">

          <h2 class="product-title pointer mb-2"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
          <h2 class="product-title  pointer mb-2"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" v-else>{{product.ItemNameEn}}</h2>
          <div class="price">
            <span class="text-sm d-block" v-if="activeCart.includes(product.id)">{{$t('total')}} : {{ $n(product.price * qty, 'currency' , 'en') }}</span>

            <!-- <del class="text-sm">{{ $n(120, 'currency' , 'en') }}</del> -->
            <span class="text-primary text-sm">{{ $n(product.price, 'currency' , 'en') }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import { qtyss , wieghts } from '@/utilities/updateQty.js'
import updateCart from '@/mixins/updateCart.js'
export default {
  props : ['loading' , 'product'],
  mixins : [updateCart]
}
</script>

<style scoped src="@/assets/scss/partials/product2.css"/>
