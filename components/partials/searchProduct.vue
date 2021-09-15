<template>
    <div>
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        type="card, list-item-two-line"
      ></v-skeleton-loader>
      <div class=" p-4 d-flex pr-partial" v-else>
        <div class="img mr-4"  >
          <v-img width="100" @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" :src="product.ItemImage"></v-img>
          
        </div>
        <div class="meta">
          <h2 class="product-title pointer mb-2"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
          <h2 class="product-title  pointer mb-2"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})" v-else>{{product.ItemNameEn}}</h2>
          <div class="price">
            <del class="text-sm">{{ $n(120, 'currency' , 'en') }}</del>
            <span class="text-primary text-sm">{{ $n(100, 'currency' , 'en') }}</span>
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
