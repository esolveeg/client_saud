<template>
  <div class="text-center">
    <v-bottom-sheet v-model="mobileFiltersModal">
      <v-list>
        <v-list-item>
          <v-flex>
            <v-chip
              v-if="localFilters.group.name !== null"
              class="ma-2"
              close
              @click:close="clearFilter('group')"
            >
              {{localFilters.group.name}}
            </v-chip>
            <v-chip
              v-if="localFilters.price.length > 0"
              class="ma-2"
              close
              @click:close="clearFilter('price')"
            >
               {{ $n(price[0], 'currency' , 'en') }} - {{ $n(price[1], 'currency' , 'en') }} 
            </v-chip>
          </v-flex>
        </v-list-item>
        <v-subheader>{{$t('categories')}}</v-subheader>
        <ul class="categories" v-if="loading">
              <v-skeleton-loader
                  v-for="i in 8"
                  :key="i"
                  class="mx-auto w-full"
                  max-width="300"
                  :loading="loading"
                  type="list-item"
              ></v-skeleton-loader>
          </ul>
          <v-list-item
            v-else
            v-for="group in groups"
            :key="group.id"
            @click.prevent="filter(group)"
            link
          >

            <v-icon>mdi-{{group.icon}}</v-icon>
            <v-list-item-title v-text="group.GroupName" v-if="$i18n.locale === 'ar'"></v-list-item-title>
            <v-list-item-title v-text="group.GroupNameEn" v-else></v-list-item-title>
          </v-list-item>
        <v-subheader>{{$t('price')}}</v-subheader>
        <v-list-item>
          <v-row>
            <v-col cols="12">
              <v-flex>
                <v-chip
                  class="ma-2"
                  color="primary"
                >
                <v-text-field @change="setPrice" v-model="price[0]" dark class="price-filter"></v-text-field>
                 <!-- {{$t('from')}} {{ $n(price[0], 'currency' , 'en') }}  -->
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="primary"
                >
                <v-text-field @change="setPrice" v-model="price[1]" dark class="price-filter"></v-text-field>
                  <!-- {{$t('to')}} {{ $n(price[1], 'currency' , 'en') }} -->
                </v-chip>

              </v-flex>
            </v-col>
            <v-col cols="12">
              <v-range-slider
                v-model="price"
                @change="setPrice"
                dense
                max="500"
                min="0"
              ></v-range-slider>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-btn @click.prevent="apply" class="d-block w-full" color="primary">{{$t('apply')}}</v-btn>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>


<script>
// import filters from '@/mixins/filters.js'
import {mapGetters} from 'vuex'
// import addParamsToLocation from '@/utilities/helpers.js'
  export default {
    computed:{
      ...mapGetters({
         groups: 'group/groups',
         loading: 'group/loading',
       }),
      mobileFiltersModal: {
        get: function() {
          return this.$store.getters['ui/mobileFiltersModal']
        },
        set: function(newValue) {
          this.$store.commit('ui/mobileFiltersModal' , newValue)
        }
      },
    },
    data(){
      return{
        price: [0, 500],
        localFilters:{
          price : [],
          group: {
            id : null,
            name : null,
          },
        },
      }
    },
    methods:{
      addParamsToLocation(params) {
        this.$store.dispatch('product/getProducts' , params)
        history.pushState(
            {},
            null,
            this.$route.path +
            '?' +
            Object.keys(params)
                .map(key => {
                return (
                    encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                )
                })
                .join('&')
        )
        window.scrollTo({ top:0, behavior: 'smooth'});
      },
      filter(group){
          const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
          const groupFilter = {
            id : group.id,
            name
          }
          this.localFilters.group = groupFilter
          // this.$store.commit('product/groupFilter' , groupFilter)
          // let query = this.$route.query
          // query.group = group.id
          // this.addParamsToLocation(query)
      },
      filterPriceFrom(price){
        // let query = this.$route.query
        this.localFilters.price[0] = price
      },
      filterPriceTo(price){
        // let query = this.$route.query
        this.localFilters.price[1] = price
      },
      setPrice(){
        this.localFilters.price = this.price
      },
      apply(){
        let query = this.$route.query

        if(this.localFilters.group.id !== null){
          this.$store.commit('product/groupFilter' , this.localFilters.group)
          query.group = this.localFilters.group.id
        }
        if(this.localFilters.price.length > 0){
          this.$store.commit('product/groupFilter' , this.localFilters.group)
          query.priceFrom = this.localFilters.price[0]
          query.priceTo = this.localFilters.price[1]
        }

        this.addParamsToLocation(query)
        this.mobileFiltersModal = false
      }
    },
    created(){
      console.log(this.$route.query)
      let price = [0 , 500]
        if(this.$route.query.priceFrom){
          price[0] = this.$route.query.priceFrom
        }
        if(this.$route.query.priceTo){
          price[1] = this.$route.query.priceTo
        }

      this.price = price
    }
    
  }
</script>