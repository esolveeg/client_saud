<template>
<div class="shop">
  <v-container>
    <v-row>
      <v-col class="top-icons" cols="12">
        <div class="d-flex flex-wrap space-between px-4">
          <!-- show the applied filters -->
          <div class="applied-filters d-flex max-w-80 flex-wrap">
            <div class="d-flex">
              <v-chip
                v-if="groupFilter.id !== null"
                class="ma-2"
                close
                @click:close="clearFilter('group')"
              >
                {{groupFilter.name}}
              </v-chip>
              <v-chip
                v-if="priceFrom !== null"
                class="ma-2"
                close
                @click:close="clearFilter('price')"
              >
                {{ $n(priceFrom, 'currency' , 'en') }} - {{ $n(priceTo, 'currency' , 'en') }}
              </v-chip>
            </div>
          </div>
          <!-- open filters modal "desktop hiddem" -->
          <div class="md-hidden">
            <v-icon @click.prevent="openFiltersModal">mdi-filter-outline</v-icon>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <!-- preview the quantity of products -->
        <div class="showing text-center">
          {{$t('showing')}} {{products.total}} {{$t('products')}}
        </div>
      </v-col>
      <v-col class="sm-hidden" cols="3">
        <!-- side bar of categories and prices -->
        <shop-sidebar/>
      </v-col>
      <!-- actual products area -->
      <v-col cols="12" md="9" v-if="loading">
         <v-row>
          <v-col cols="6" xl="2" lg="3" v-for="i in 8" :key="i">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-col>
         </v-row>
      </v-col>
      <v-col v-else cols="12" md="9">
        <!-- shwo products when length is greater than 0 -->
        <v-row  v-if="products.total > 0">
          <v-col cols="6" xl="2" lg="3" md="4" v-for="(product , index) in products.data" :key="index">
            <partials-product :product="product"/>
          </v-col>
        </v-row>
        <!-- show no product when there is no -->
        <v-row v-else >
          <v-col cols="12" class="no-products" > 
              <v-icon x-large class="remove-icon">
                mdi-cart-remove
              </v-icon>
              <span class="text-large">{{$t('no_products_products')}}</span>
              <v-btn @click.prevent="$router.push({name : `shop___${$i18n.locale}`})" color="primary">{{$t('continue_shopping')}} <v-icon dark>mdi-arrow-right</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
       <!-- show pagination after validating that there is products  -->
      <v-col cols="12"  v-if="products && products.total > 0">
        <div class="text-center">
           <v-pagination
              v-model="pageModel"
              :length="products.last_page"
              @input="paginate"
              :total-visible="10"
            ></v-pagination>
        </div>
      </v-col>
    </v-row>
    
  </v-container>
  <modals-mobile-filters/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import productsMixin from '@/mixins/products.js'

export default {
  mixins : [productsMixin],
  computed: {
    ...mapGetters({
      products: 'product/products',
      groupFilter: 'product/groupFilter',
      priceFrom: 'product/priceFrom',
      priceTo: 'product/priceTo',
      loading: 'product/loading',
    }),
    pageModel: {
      get() {
        return this.$store.getters["shop/pageModel"];
      },
      set(payload) {
        this.$store.commit("shop/pageModel", payload);
      },
    },
  },
  methods:{
    openFiltersModal(){
				this.$store.commit('ui/mobileFiltersModal', true)
    },
    
  },
  created(){
    this.initShop()
  }
  
}
</script>

<style scoped>
.applied-filters div:not(:last-child){
  margin: 0 10px 10px 0;
}
.showing{
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 10px 0;
}
</style>