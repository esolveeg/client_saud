<template>
    <v-row class="product">
        <v-col cols="12">
            <div class="d-flex space-between">
                <div class="d-flex right">
                    <div class="img pointer"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})">
                        <v-img v-if="product.image" :src="product.image" lazy-src="https://qomra.pro/wp-content/uploads/2019/03/image-placeholder-350x350.png"/>
                        <v-img v-else :src="product.ItemImage" lazy-src="https://qomra.pro/wp-content/uploads/2019/03/image-placeholder-350x350.png"/>
                    </div>
                    <div class="data pointer" @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})">
                        <h2 class="product-title"  v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
                        <h2 class="product-title"  v-else>{{product.ItemNameEn}}</h2>
                        <span class="text-medium d-block" v-if="product.size">{{$t('size')}} : {{product.size}}</span>
                        <div class="d-flex items-center" v-if="product.color">
                            {{$t('color')}} : <span class="ml-2 color-lable" :style="{backgroundColor : `#${product.color}`}"></span>
                        </div>
                        <span class="text-medium d-block">{{ $n(product.price, 'currency' , 'en') }}</span>
                        <!-- <h4 class="product-subtitle">subname</h4> -->
                    </div>
                </div>
                <div class="right sm-hidden d-flex atc items-center py-2">
                    <v-icon @click.prevent="increase" small>mdi-plus</v-icon>
                    <v-select @change="updateQty" :items="qtys" class="atc-input"  v-model="qty"/>
                    <v-icon @click.prevent="decrease" small>mdi-minus</v-icon>
                </div>
                
                <div class="left pointer" @click.prevent="remove">
                    <v-icon class="danger">mdi-trash-can-outline</v-icon>
                     <span class="sm-hidden">{{ $n(product.price * product.qty, 'currency' , 'en') }}</span>
                </div>
                
            </div>
            <div class="d-flex md-hidden space-between items-center">
                <div class="right d-flex atc items-center py-2">
                    <v-icon @click.prevent="increase" small>mdi-plus</v-icon>
                    <v-select @change="updateQty" :items="qtys" class="atc-input"  v-model="qty"/>
                    <v-icon @click.prevent="decrease" small>mdi-minus</v-icon>
                </div>
                <div class="left">
                     <span>{{ $n(product.price * product.qty, 'currency' , 'en') }}</span>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>

export default {
    props :['product'],
    data(){
        let qty = this.product.qty
      
        return {
            inCart : [],
            qtys:[1,2,3,4,5,6,7,8,9,10] ,
            qty
        }
    },
    methods:{
        remove(){
           this.$store.dispatch('cart/remove', this.product.id)
        },
        updateQty() {
            const payload = {
                id : this.product.id,
                qty : this.qty
            }
            this.$store.dispatch('cart/update' , payload)
        },
        decrease(){
            const index = this.qtys.indexOf(this.qty)
            if(index !== 0){
                this.qty = this.qtys[index-1]
                this.updateQty()
            }
        },
        increase(){
            const index = this.qtys.indexOf(this.qty)
            if(index !== this.qtys.length -1)
            this.qty = this.qtys[index + 1]
            this.updateQty()
        },
    }
}
</script>

<style scoped src="@/assets/scss/partials/product.css"/>