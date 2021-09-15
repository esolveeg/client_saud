<template>
    <div class="shipping">
    <v-container>
        <v-row class="p-b">
            <v-col cols="12" md="6">
                <div class="d-flex items-center space-between">
                    <v-subheader>
                        {{$t('shipping_information')}}
                    </v-subheader>
                    <div v-if="addresses.length > 0" class="pointer" @click.prevent="insert">
                        <h4 @click.prevent="insert">{{$t('none_of_addresses')}}<v-icon class="text-primary">mdi-plus</v-icon></h4>
                    </div>
                </div>
                <v-form
                    ref="form"
                    v-model="valid"
                    v-show="addresses.length > 0"
                    lazy-validation
                >   
                    <div class="mb-10" v-if="err">
                        <v-alert
                        border="top"
                        color="red lighten-2"
                        v-if="typeof err == 'string'"
                        dark
                        >
                        {{err}}
                        </v-alert>
                    </div>
                    <v-select
                        v-show="addresses.length > 0"
                        :items="addresses"
                        v-model="form.address"
                        @change="applyAddress"
                        item-text="title"
                        item-value="id"
                        :label="$t('address')"
                        >
                    </v-select>

                </v-form>
                <div  v-show="addresses.length == 0">
                    <v-alert
                    border="top"
                    color="primary"
                    dark
                    >
                    {{$t('no_address_shipping')}}
                    </v-alert>
                    <forms-create-address @created="addressCreated"/>
                </div>

                <v-row class="btns sm-hidden py-4">
                        <v-col cols="5" @click.prevent="$emit('back')">
                            <v-btn text >
                                <v-icon>mdi-arrow-left</v-icon>
                                {{$t('back')}}
                            </v-btn>
                        </v-col>
                        <v-col cols="7">
                            <v-btn :disabled="form.address == null" text @click.prevent="cehckout">
                                {{$t('checkout')}}
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-col>
            <v-col cols="12" md="6">
                <v-subheader class="summary-title">
                    {{$t('cart_summary')}}
                </v-subheader>
                <shop-cart-summary/>
            </v-col>
        </v-row>
    </v-container>
        <div class="totals">
            <v-container>
                <div class="totals__wrapper">
                    <div class="mb-2"> {{$t('subtotal')}}: {{ $n(cart.subtotal, 'currency' , 'en') }}</div>
                    <div class="mb-2" v-if="cart.shipping"> {{$t('shipping')}}: {{ $n(cart.shipping, 'currency' , 'en') }}</div>
                    <h2 class="product-title mb-2"> {{$t('total_amount')}}: {{ $n(cart.total, 'currency' , 'en') }}</h2>
                    <v-row class="btns">
                        <v-col cols="5" @click.prevent="$emit('back')">
                            <v-btn text >
                                <v-icon>mdi-arrow-left</v-icon>
                                {{$t('back')}}
                            </v-btn>
                        </v-col>
                        <v-col cols="7">
                            <v-btn :disabled="form.address == null" text @click.prevent="cehckout">
                                {{$t('checkout')}}
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </div>
        <modals-create-address @created="addressCreated"/>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
      ...mapGetters({
        cart: 'cart/cart',
        addresses: 'user/addresses',
      })
    },

    data(){
        return {
            valid : false,
            err : null,
            form : {
                address : null
            }
        }
    },

    methods:{
        insert(){
            console.log('insert ')
            this.$store.commit('ui/createAddressModal' , true)
        },
        cehckout() {
            this.$refs.form.validate()
            if(this.valid){
                this.$store.dispatch('cart/checkout')
                .then(() => {
                   this.$emit('finished')
                })
            }
        },
        addressCreated(id){
            this.form.address = id
            this.applyAddress()
          
        },
        applyAddress() {
            this.$store.dispatch('cart/applyAddress' , this.form.address)
        },
        // addressCreated(id){
        //     console.log(id)
        //     this.form.address = id
        //     this.$store.dispatch('cart/applyAddress' , this.form.address)
        // },
        getAddresses(){
            this.$store.dispatch('user/getAddresses')
            .then(() => {
                if(this.cart.address_id) {
                    this.form.address = this.cart.address_id
                }
            })
        }
    },

    ...mapGetters({
        addresses: 'user/addresses',
        addressesLoading: 'user/addressesLoading',
      }),

    created(){
          this.getAddresses()

    }
}
</script>

<style>
.summary-title{
    display: block;
    padding:0 !important;
    margin:20px 0 !important;
}
@media(min-width: 768px){
    .shipping .totals {
        display: none !important;
    }
}
</style>