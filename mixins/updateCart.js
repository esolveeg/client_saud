
import {mapGetters} from 'vuex'
export default {
    data () {
      return {
        qty : 1,
        qtys : [],
      }
    },
    computed : {
      ...mapGetters({
        activeCart: 'cart/activeCart',
        activeWishlist: 'wishlist/activeWishlist',
      }),
  },
  methods:{
    //add product with options to cart from single product page
    singleWithOptions(){
      //check if the options are provided
      if(this.$route.query.color && this.$route.query.size){
        let payload = {product: this.product.id , qty :this.qty , color :this.$route.query.color , size : this.$route.query.size }
        this.plainAddToCart(payload)
      } else{ 
        // show message to make use select options if its not provided
        const snackbar = {
          active : true,
          text: 'please_select_option'
        }
        this.$store.commit('ui/setSnackbar' , snackbar)
      }
    },
    
    //add product with options to cart from shop or home  page (partials/product component)
    partialWithOptions(){
      //open modal
      
      this.$store.commit('product/modalId' , this.product.id)
      this.$store.commit('ui/addToCartModal' , true)

      
    },
    // add to cart if product has options
    optionsRequired(){
      if(this.$route.name == `shop-id___${this.$i18n.locale}`){
        // add to cart if product has options from single product page (shop/_id.vue)
        this.singleWithOptions()
      } else {
        // add to cart if product has options from product partial page page (components/partials/product.vue)
        this.partialWithOptions()
      }
    },
    // rediredct to login if use not logged in & show snack bar
    loginRequired(productProp , qtyProp){
      const snackbar = {
        active : true,
        text: 'login_reuired'
      }
      this.$store.commit('ui/setSnackbar' , snackbar)
      if(!this.product.hasOptions){
          localStorage.setItem(productProp , this.product.id )
          localStorage.setItem(qtyProp , this.qty )
      }

      this.$router.push('/login')
    },
    // add to cart actions 
      /** params [payload | object] */
    plainAddToCart(payload){
      this.$store.dispatch('cart/create', payload)
      .then(() => {
        this.inCart.push(this.product.id)
        this.product.InCart = true
      })
    },
    addToCart(){
      if(this.$auth.loggedIn){
        console.log(this.product.hasOptions)
        if(this.product.hasOptions){
          this.optionsRequired()
        } else {
          const payload = {product: this.product.id , qty :this.qty}
          this.plainAddToCart(payload)
        }
      } else {
        this.loginRequired('product' , 'qty')
      }
    },
    plainAddToWishlist(){
      this.$store.dispatch('wishlist/create', {product: this.product.id})
    },
    addToWishlist() {
        if(this.$auth.loggedIn){
          this.plainAddToWishlist()
        } else {
            this.loginRequired('productW' , 'qtyW')
        }
    },
    updateQty() {
      const payload = {
        id : this.product.id,
        qty : this.qty
      }
      this.$store.dispatch('cart/update' , payload)
    },
    changeQty(type){
      console.log(type)
      const index = this.qtys.indexOf(this.qty)
      //check if he wants to decrease the first value to prevent
      if(index == 0 && type == 'decrease' ){
        return
      }
      //check if he wants to increse the last value to prevent
      if(index == this.qtys.length - 1 && type == 'increase' ){
        return
      }
      if(index == 0 && type == 'decrease' ){
        return
      }
      this.qty = type == 'decrease' ? this.qtys[index-1] : this.qtys[index + 1]
      this.updateQty()
    },
  },
  created(){
    //check if the page is single product to get the product from the server
    if(this.$route.name == `shop-id___${this.$i18n.locale}`){
      let payload = {
        id : this.$route.params.id,
        filters :{}
      }
      //check if query parameter has color filter and apply it
      this.$route.query.color ? payload.filters.color = this.$route.query.color : ''
      //check if query parameter has size filter and apply it
      payload.filters.size = this.$route.query.size
  
      // this.$store.dispatch('product/getProduct' , payload)
      // .then(() => {
      //   this.qtys = this.product.ByWeight === 1 ? this.$store.getters['ui/weights'] : this.$store.getters['ui/qtys']
      //   this.qty = this.product.cartQty ? this.product.cartQty : 1
      // })
      //if we are not on the shop page then we are on product partial
    } else {
      this.qtys = this.product.ByWeight === 1? this.$store.getters['ui/weights'] : this.$store.getters['ui/qtys']
      //check if the product has been added to the cart and have qty to set local cart qty properity
      this.qty = this.product.cartQty ? this.product.cartQty : 1
    }
  },
  }