<template>
    <v-row class="product">
        <v-col cols="12">
            <div class="d-flex space-between">
                <div class="d-flex right">
                    <div class="img pointer"  @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})">
                        <v-img :src="product.ItemImage" lazy-src="https://qomra.pro/wp-content/uploads/2019/03/image-placeholder-350x350.png"/>
                    </div>
                    <div class="data pointer" @click.prevent="$router.push({name : `shop-id___${$i18n.locale}` , params : {id : product.id}})">
                        <h2 class="product-title"  v-if="$i18n.locale == 'ar'">{{product.ItemName}}</h2>
                        <h2 class="product-title"  v-else>{{product.ItemNameEn}}</h2>
                        <div class=" mt-2 meta">
                            <span>{{$t('quantity')}} :</span><span>{{ product.qty }}</span>
                        </div>
                        <div class=" mt-2 meta">
                            <span>{{$t('price')}} :</span><span>{{ $n(product.price, 'currency' , 'en') }}</span>
                        </div>
                        <div class=" mt-2 meta">
                            <span>{{$t('total')}} :</span><span>{{ $n(product.price * product.qty, 'currency' , 'en') }}</span>
                        </div>
                        <!-- <h4 class="product-subtitle">subname</h4> -->
                    </div>
                </div>
            </div>
            <div class="d-flex space-between items-center">
            </div>
        </v-col>
    </v-row>
</template>

<script>

export default {
    props :['product'],
    data(){
         let qtys = this.product.byWeight ? 
         [1,2,3,4,5,6,7,8,9,10] 
         : 
         [
            .25 , .5 , .75 , 1,
            1.25 , 1.5 , 1.75 ,2,
            2.25 , 2.5 , 2.75 , 3,
            3.25 ,3.5 , 3.75 , 4,
            4.25 , 4.5 , 4.75 , 5,
            5.25 , 5.5 , 5.75 , 6,
            6.25 , 6.5 , 6.75 , 7,
            7.25 , 7.5 , 7.75 , 8,
            8.25 , 8.5 , 8.75 , 9,
            9.25 , 9.5 , 9.75 , 10,
            10.25 , 10.5 , 10.75 , 11,
            11.25 , 11.5 , 11.75 , 12,
            12.25 , 12.5 , 12.75 , 13,
            13.25 , 13.5 , 13.75 , 14,
            14.25 , 14.5 , 14.75 , 15,
            15.25 , 15.5 , 15.75 , 16,
            16.25 , 16.5 , 16.75 , 17,
            17.25 , 17.5 , 17.75 , 18,
            18.25 , 18.5 , 18.75 , 19,
            19.25 , 19.5 , 19.75 , 20,
        ]
        let qty = this.product.qty
        return {
            inCart : [],
            qtys,
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