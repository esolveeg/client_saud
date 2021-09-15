<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="p-0 md-hidden user">
      <v-avatar color="primary mb-2">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <div class="pointer" @click.prevent="editAccount">
        <span class="title">{{$auth.user.user.name}}</span>
        <v-icon color="primary" small>
          mdi-pencil
        </v-icon>           
      </div>
      <v-subheader>{{$auth.user.user.email}}</v-subheader>
    </v-col>
    <v-col cols="12" class="md-hidden">
      <v-list flat>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click.prevent="item.action(item.modal)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.text)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-col>
    <v-col cols="12" class="sm-hidden user">
      <div class="d-flex items-center justify-center flex-column">
        <v-avatar color="primary mb-2">
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
        <div class="pointer" @click.prevent="editAccount">
          <span class="title">{{$auth.user.user.name}}</span>
          <v-icon color="primary" small>
            mdi-pencil
          </v-icon>           
        </div>
        <v-subheader>{{$auth.user.user.email}}</v-subheader>

      </div>
    </v-col>
    <v-col cols="12" class="sm-hidden mb-8">
      <v-container>
        
    <v-tabs vertical>
      <v-tab class="left" :class="$route.query == index ? 'v-tab--active' : ''"  v-for="(item,index) in items" @click.prevent="action(item.text , index)"  :key="index">
        <v-icon left>
         {{item.icon}}
        </v-icon>
        {{$t(item.text)}}
      </v-tab>
      <v-tabs-items v-model="selectedItem">

        <v-tab-item>
          <v-card flat>
            <v-card-text >
              <account-orders/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      
      <v-tab-item>
          <v-card flat>
            <v-card-text >
              <account-wishlist/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text >
              <account-addresses/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
      </v-container>
      
    </v-col>
    <modals-mobile-wishlist/>
    <modals-mobile-points/>
    <modals-mobile-addresses/>
    <modals-mobile-orders/>
    <modals-edit-account/>
  </v-row>
</template>

<script>
export default {
    middleware: 'auth',
    data(){
      const action = this.openModal
     const selectedItem =parseInt(this.$route.query.tab) || 0
      return {
        selectedItem,
        items: [
          { action , modal : 'mobileOrdersModal'  , text: 'order_history', icon: 'mdi-calendar-blank' },
          { action , modal : 'mobileWishlistModal'  , text: 'wishlist', icon: 'mdi-heart-outline' },
          { action , modal : 'mobileAddressesModal'  , text: 'shipping_addresses', icon: 'mdi-office-building-marker-outline' },
          { action , modal : 'cart'  , text: 'my_cart', icon: 'mdi-cart-arrow-down' },
          { action , modal : 'logout'  , text: 'logout', icon: 'mdi-logout-variant' },
        ],

      }
    },

    methods:{
      openModal(modal){
        if(modal == 'cart') {
          this.$router.push({name : `shop-cart___${this.$i18n.locale}`})
          return
        } 
        if(modal == 'logout') {
          this.logout()
          return
        }
        this.$store.commit(`ui/${modal}` , true)
      },
      action(action , index){
        if(action == 'my_cart'){
          this.$router.push({name : `shop-cart___${this.$i18n.locale}`})
        }
        if(action == 'logout'){
          this.logout()
        }
        this.selectedItem = index
        this.addParamsToLocation({tab : index})
      },
      addParamsToLocation(params) {
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
        },
      editAccount(){
        this.$store.commit('ui/editAccountModal' , true)
      },
      logout(){
        this.$auth.logout().then(() => {
          const snackbar = {
            active: true,
            text: 'logged out in successfully',
          }
          this.$store.commit('ui/setSnackbar', snackbar)
          this.$store.commit('cart/setCart', [])
        })
      }
    }
  }
</script>
<style scoped>
.user{
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-gray-darken);
  flex-direction: column;
}
.left {
  justify-content: flex-start !important;
}
.title{
  color: var(--primary-color);
}
</style>