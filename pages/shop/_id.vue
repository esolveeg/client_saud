<template>
<div class="shop">
  <v-row justify="center" align="center">
    <v-col cols="12">
      <!-- <layouts-bradcrumbs/> -->
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader
              width="100%"
              type="image"
              height="800"
            >
            </v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader
            v-for="i in 6"
            :key="i"
              width="100%"
              type="list-item"
            >
            </v-skeleton-loader>
          </v-col>

          <v-col cols="12" v-else>
            <v-row>

              <v-col cols="12" lg="6" >
                <div class="">
                    <!-- <v-img min-height="200" :src="product.ItemImage"></v-img> -->
                     <v-tabs vertical v-if="typeof product.images !== 'undefined' && product.images.length > 0" v-model="tabs">
                      <v-tab class="left mb-2" v-for="(item,index) in product.images" :key="index">
                        <div class="img-wrapper">
                          <v-img height="48" width="50" :src="item.image"></v-img>
                        </div>
                      </v-tab>
                      <v-tab-item class="" v-for="(item,index) in product.images" :key="index">
                        <v-img class="img shadow" :src="item.image">
                        </v-img>
                      </v-tab-item>
                    </v-tabs>
                    <v-img v-else min-height="200" :src="product.ItemImage"></v-img>

                </div>
              </v-col>
              <!-- <v-col cols="2"></v-col> -->

              <v-col cols="12" class="product-description" lg="6" >   
                <h2 class="product-title larger mb-1" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
                <h2 class="product-title larger mb-1" v-else>{{product.ItemNameEn}}</h2>
                <nuxt-link :to="{name : `shop___${$i18n.locale}` , query: {group : product.group.id}}" class="category" v-if="$i18n.loale == 'ar'">{{product.group.GroupName}}</nuxt-link>
                <nuxt-link :to="{name : `shop___${$i18n.locale}` , query: {group : product.group.id}}" class="category" v-else>{{product.group.GroupNameEn}}</nuxt-link>

                <p class="desc" v-if="$i18n.locale == 'ar' && product.ItemDesc">{{product.ItemDesc}}</p>
                <p class="desc" v-if="$i18n.locale == 'en' && product.ItemDescEn">{{product.ItemDescEn}}</p>
                <!-- <p class="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quibusdam quos? Minima iure repellendus quia dignissimos perspiciatis similique consequatur optio reiciendis, repudiandae aperiam iste aspernatur, dicta asperiores corrupti distinctio soluta?
                </p> -->
                <div class="price  text-h4">
                  <span class="text-primary">{{ $n(product.price, 'currency' , 'en') }}</span>
                  <!-- <del >{{ $n(120, 'currency' , 'en') }}</del> -->
                </div>
                <div class="size-chart" v-if="product.sizes">
                  <h4 class="mb-4 mt-4">{{$t('sizes')}}</h4>
                  <v-chip-group
                    column
                  >
                    <v-chip
                      v-for="(size , index) in product.sizes"
                      :key="index"
                      :class="$route.query.size == size.size? `v-chip--active` : ''"
                      class=""
                    @click.prevent="filter('size' , size.size)"
                    >
                      <span>{{size.size}}</span>
                    </v-chip>
                  </v-chip-group>
                </div>
                <div class="colors"  v-if="product.colors">
                  <h4 class="mb-4 mt-4">{{$t('colors')}}</h4>
                  <v-chip-group
                    column
                  >
                    <v-chip
                      v-for="(color,index) in product.colors"
                      :key="index"
                      :class="product.initlaColor == color.color || $route.query.color == color? `v-chip--active` : ''"
                      large
                    @click.prevent="filter('color' , color.color)"
                    >
                     <span class="color" :style="{backgroundColor : `#${color.color}`}"></span>
                    </v-chip>
                  </v-chip-group>
                </div>
                <div class="qty">
                  <div class="d-flex atc items-center py-2">
                    <v-icon @click.prevent="changeQty('increase')" small>mdi-plus</v-icon>
                    <v-select @change="updateQty" :items="qtys" class="atc-input"  v-model="qty"/>
                    <!-- <v-text-field class="atc-input"  v-model="qty"/> -->
                    <v-icon @click.prevent="changeQty('decrease')" small>mdi-minus</v-icon>
                  </div>
                </div>
                <div class="btns d-flex">
                  <v-btn  text @click.prevent="addToCart" v-if="product.hasOptions" class="border  p-4 rounded-xl">
                    <v-icon>mdi-cart-arrow-down</v-icon>
                    <span >{{$t('add_to_cart')}}</span>
                  </v-btn>
                  <v-btn v-else :disabled="product.InCart" text @click.prevent="addToCart" :class="{primary :product.InCart || activeCart.includes(product.id) , textWhite :product.InCart || activeCart.includes(product.id)}"  class="border  p-4 rounded-xl">
                    <v-icon>mdi-cart-arrow-down</v-icon>
                    <span v-if="product.InCart || activeCart.includes(product.id)">{{$t('on_your_cart')}}</span>
                    <span v-else>{{$t('add_to_cart')}}</span>
                  </v-btn>
                  <v-btn
                    class="mx-2 p-4 wishlist-btn border"
                    fab
                    @click.prevent="addToWishlist"
                    :disabled="product.inWishlist"
                    :class="{active :product.inWishlist || activeWishlist.includes(product.id)}"
                    text
                    light
                    small
                  >
                    <v-icon light>
                      mdi-heart
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <modals-mobile-filters/>
</div>
</template>

<script>
import updateCart from '@/mixins/updateCart.js'
import productsMixin from '@/mixins/products.js'
import { mapGetters } from 'vuex'

export default {
  mixins: [updateCart , productsMixin],
  computed:{
    ...mapGetters({
      product: 'product/product',
      loading: 'product/loading'
    })
  },
  data(){
    return {
      tabs: null,
    }
  },
  created(){
    this.initSingleProduct() 
  }
}
</script>

<style scoped src="@/assets/scss/pages/single-product.css"/>

