<template>
    <v-card class="cartsummary relative">
        <v-skeleton-loader type="image" height="300" v-if="loading"></v-skeleton-loader>
        <div v-else>
            <div class="cartsummary__wrapper" v-if="typeof cart.products !== 'undefined'">
                <partials-cart-summary-product v-for="(item,index) in cart.products" :key="index" :product="item"/>
            </div>
            <div class="cartsummary__total"  v-if="typeof cart.products !== 'undefined'">
                <div class="d-flex w-full justify-between items-center">
                    <h2>{{$t('subtotal')}}: </h2>
                    <h2>EGP{{cart.subtotal}}</h2>
                </div>
                <div class="d-flex w-full justify-between items-center" v-if="cart.shipping">
                    <h2>{{$t('shipping')}}: </h2>
                    <h2>EGP{{cart.shipping}}</h2>
                </div>
                <div class="d-flex w-full justify-between items-center"  v-if="cart.discount_percent">
                    <h2>{{$t('discount')}}({{cart.discount_percent}}%): </h2>
                    <h2>EGP{{cart.discount_value}}</h2>
                </div>
                <div class="d-flex w-full justify-between items-center"  v-else-if="cart.discount_value">
                    <h2>{{$t('discount')}}: </h2>
                    <h2>EGP{{cart.discount_value}}</h2>
                </div>
                <div class="d-flex w-full justify-between items-center">
                    <h2>{{$t('total')}}: </h2>
                    <h2>EGP{{cart.total}}</h2>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>

import { mapGetters } from 'vuex';
  export default {
    computed: {
       ...mapGetters({
            cart: 'cart/cart',
            loading: 'cart/loading',
        })
    },
  }
</script>
<style  scoped src="@/assets/scss/partials/cart-summary.css"></style>
