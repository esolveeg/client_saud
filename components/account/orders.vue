<template>
  <div>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="primary"/>
    </div>
    <div v-else>
      <v-expansion-panels v-if="typeof orders !== undefined && orders.length > 0" >
        <v-expansion-panel
          v-for="order in orders"
          :key="order.id"
        >
          <v-expansion-panel-header>
            <div class="d-flex items-center space-between w-full">
              <span><span class="primary-text">{{$t('order')}} #{{order.id}} </span>{{$t('orderd_at')}}: {{order.closed_at}} </span>  
              <span>{{$t("statues")}} : <v-chip color="primary" class="text-center" small>{{order.status}}</v-chip></span>

            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{$t("statues")}} : <v-chip color="primary" class="text-center" small>{{order.status}}</v-chip>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{$t('name')}}
                  </th>
                  <th class="text-left">
                    {{$t('price')}}
                  </th>
                  <th class="text-left">
                    {{$t('qty')}}
                  </th>
                  <th class="text-left">
                    {{$t('total')}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in order.products"
                  :key="product.id"
                >
                  <td v-if="$i18n.locale == 'ar'">{{ product.ItemName }}</td>
                  <td v-else>{{ product.ItemNameEn }}</td>
                  <td>{{ $n(product.price, 'currency' , 'en') }}</td>
                  <td>{{ product.qty }}</td>
                  <td>{{ $n(product.price * product.qty, 'currency' , 'en')  }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div v-else class="no-products" > 
        <v-icon x-large class="remove-icon">
          mdi-cart-remove
        </v-icon>
        <span class="text-large">{{$t('no_orders')}}</span>
        <v-btn @click.prevent="$router.push({name : `shop___${$i18n.locale}`})" color="primary">{{$t('continue_shopping')}} <v-icon dark>mdi-arrow-right</v-icon></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed : {
        mobileOrdersModal: {
            get: function() {
				return this.$store.getters['ui/mobileOrdersModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/mobileOrdersModal' , newValue)
            }
        },
        ...mapGetters({
            orders : 'cart/orders',
            loading : 'cart/orderLoading'
        }),
    },
    data () {
      return {
        sound: true,
        widgets: false,
      }
    },
    methods:{
        close(){
            console.log('asd')
            this.$store.commit('ui/mobileOrdersModal' , false)
        },
        save(){
            console.log('save')
        }
    },
    created(){
        this.$store.dispatch('cart/getOrders')
    },
  }
</script>