<template>
  <v-row justify="center">
    <v-dialog
      v-model="mobileOrdersModal"
      fullscreen
      hide-overlay
      transition="slide-x-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          class="mb-4"
          dark
        >
          <v-btn
            icon
            @click.prevent="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title calss="text-white">{{$t('Orders')}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list
          v-if="typeof orders !== undefined && orders.length > 0"
          three-line
          subheader
        >
          <v-list-item>
            <v-expansion-panels >
              <v-expansion-panel
                v-for="order in orders"
                :key="order.id"
              >
                <v-expansion-panel-header>
                  {{$t('orderd_at')}}: {{order.closed_at}}
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
          </v-list-item>
        </v-list>
        <div v-else class="no-products" > 
          <v-icon x-large class="remove-icon">
            mdi-cart-remove
          </v-icon>
          <span class="text-large">{{$t('no_orders')}}</span>
          <v-btn @click.prevent="$router.push({name : `shop___${$i18n.locale}`})" color="primary">{{$t('continue_shopping')}} <v-icon dark>mdi-arrow-right</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
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
            loading : 'cart/loading'
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