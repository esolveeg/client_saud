<template>
  <v-row justify="center">
    <v-dialog
      v-model="addToCartModal"
      @click:outside="close"
      max-width="600"
    >
      <v-card v-if="loading">
        <v-container>
        <div class="d-flex">
          <v-skeleton-loader width="200" height="350" type="image"></v-skeleton-loader>
          <div>
              <v-skeleton-loader
              v-for="i in 2"
              :key="i"
              width="300"
              type="list-item-three-line"
              >
              </v-skeleton-loader>
          </div>
        </div> 

        </v-container>
      </v-card>
      <v-card v-else>
        <v-container>
            <div class="d-flex">
                <div class="img shadow mr-4">
                    <!-- <v-img max-width="200" class="img shadow" :src="product.ItemImage">
                    </v-img> -->
                    <v-tabs vertical v-model="tabs">
                      <v-tab class="left mb-2" v-for="(item,index) in product.images" :key="index">
                        <div class="img-wrapper">
                          <v-img height="48" width="50" :src="item.image"></v-img>
                        </div>
                      </v-tab>
                      <v-tab-item class="modal-tab" v-for="(item,index) in product.images" :key="index">
                        <v-img ax-width="200"  class="img shadow" :src="item.image">
                        </v-img>
                      </v-tab-item>
                    </v-tabs>
                </div>
                <div class="wrapper">
                    <h2 class="product-title larger mb-1" v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
                <h2 class="product-title larger mb-1" v-else>{{product.ItemNameEn}}</h2>
                <span class="category" v-if="$i18n.loale == 'ar'">{{product.group.GroupName}}</span>
                <!-- <nuxt-link :to="{name : `shop___${$i18n.locale}` , query: {group : product.group.id}}" class="category" v-else>{{product.group.GroupNameEn}}</nuxt-link> -->
                <!-- <p class="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quibusdam quos? Minima iure repellendus quia dignissimos perspiciatis similique consequatur optio reiciendis, repudiandae aperiam iste aspernatur, dicta asperiores corrupti distinctio soluta?
                </p> -->
                <div class="price  text-h4">
                  <span class="text-primary">{{ $n(product.POSPP, 'currency' , 'en') }}</span>
                  <!-- <del >{{ $n(120, 'currency' , 'en') }}</del> -->
                </div>
                <div class="size-chart">
                  <h4 class="mb-4 mt-4">{{$t('sizes')}}</h4>
                    
                    <span
                      v-for="(size , index) in product.sizes"
                      :key="index"
                      :class="activeSize == size.size? ` v-chip--active` : ''"
                      class="v-chip pointer"
                      @click.prevent="filter('size' , size.size)"
                    >
                      {{size.size}}
                    </span>
                </div>
                <div class="colors">
                  <h4 class="mb-4 mt-4">{{$t('colors')}}</h4>
                  <span
                    v-for="(color , index) in product.colors"
                    :key="index"
                    :class="activeColor == color.color? ` v-chip--active` : ''"
                    class="v-chip-color pointer"
                    @click.prevent="filter('color' , color.color)"
                  >
                    <span class="color" :style="{backgroundColor : `#${color.color}`}"></span>
                  </span>
                </div>
                <div class="qty">
                  <div class="d-flex atc items-center py-2">
                    <v-icon @click.prevent="increase" small>mdi-plus</v-icon>
                    <v-select :items="qtys" class="atc-input"  v-model="qty"/>
                    <!-- <v-text-field class="atc-input"  v-model="qty"/> -->
                    <v-icon @click.prevent="decrease" small>mdi-minus</v-icon>
                  </div>
                </div>
                </div>
            </div>
            <div class="btns d-flex">
                <v-btn   text @click.prevent="addToCart"  class="border w-full p-4 rounded-xl">
                <v-icon>mdi-cart-arrow-down</v-icon>
                <span >{{$t('add_to_cart')}}</span>
                </v-btn>
            </div>
        
      </v-container>
      </v-card>

    </v-dialog>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed : {
        ...mapGetters({
            product: 'product/product',
            id: 'product/modalId',
        }),
        addToCartModal: {
            get: function() {
				      return this.$store.getters['ui/addToCartModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/addToCartModal' , newValue)
            }
        },
    },
    data () {
      return {
        qty : 1,
        qtys : [1,2,3,4,5,6,7,8,9,10] ,
        loading : true,
        activeSize  :null,
        activeColor  :null,
        tabs: null,
        size : null,
      }
    },
    
    watch : {
      addToCartModal(val){
        if(val === true){ 
          this.getProduct()   
        }
      }
    },
    methods:{
        close(){
          history.pushState(
              {},
              null,
              this.$route.path)
          this.size = null
          this.loading = true
          this.activeSize = null
          this.activeColor = null
          this.$store.commit('product/modalId' , null)
          this.$store.commit('ui/addToCartModal' , false)
        },
        decrease(){
          const index = this.qtys.indexOf(this.qty)
          if(index !== 0){
            this.qty = this.qtys[index-1]
          }
        },
        increase(){
          const index = this.qtys.indexOf(this.qty)
          if(index !== this.qtys.length -1)
          this.qty = this.qtys[index + 1]
        },
        
        filter(type , value){
          let query = this.$route.query
          if(type == 'size'){
            if(query.size == value){
              delete query.size
              this.activeSize = null
            } else {
              this.activeSize = value
              query.size = value
            }
          }
          if(type == 'color'){
            this.activeColor = value
            query.color = value
          }
          this.getProduct()
        },
        addToCart(){
          if(this.activeSize && this.activeColor){
            let payload = {product: this.product.id , qty :this.qty , color :this.activeColor , size : this.activeSize }
            this.$store.dispatch('cart/create', payload)
            .then(() => {
              console.log('asd')
              this.close()
            })
          } else{ 
            const snackbar = {
              active : true,
              text: 'please_select_option'
            }
            this.$store.commit('ui/setSnackbar' , snackbar)
            this.$store.commit('product/updateProductAfterCartUpdated' , {id : this.product.id , qty : this.qty})
          }
        },
        getProduct(){
      //check if we dont need to perform loading
        const payload = {
          id :this.id,
          loading:false,
          filters :{}
        }
        this.activeSize ? payload.filters.size = this.activeSize : ''
        this.activeColor ? payload.filters.color = this.activeColor : ''
        this.$store.dispatch('product/getProduct' , payload)
        .then(res => {
          if(payload.filters.color){
            const image = this.product.images.filter(img => {
              return img.color  === payload.filters.color
            })
            if(image[0]){
              this.tabs = this.product.images.indexOf(image[0])
            }
          } else {
            const color = res.initialColor
            this.activeColor = color

            // history.pushState(
            //     {},
            //     null,
            //     this.$route.path +
            //     `?color=${color}`
            // )
          }
            this.loading = false
        })
    },
        
    },
    created(){
     
    }
  }
</script>