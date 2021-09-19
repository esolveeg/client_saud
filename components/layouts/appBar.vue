<template>
     <v-app-bar
        fixed
        class="app-bar"
        app
        >
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-btn
            icon
            @click.prevent="$router.push({name : `shop-cart___${$i18n.locale}`})"
        >
            <v-badge
                :content="count"
                :value="count"
                color="primary"
                
            >
                <v-icon >
                    mdi-cart-arrow-down
                </v-icon>
            </v-badge>
        </v-btn>
        <layouts-mobile-search/>
    </v-app-bar>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            title : 'home',
            dialog : false
        }
    },
    computed: {
        ...mapGetters({
        count: 'cart/cartCount',
        loading: 'product/loading',
        })
    },
    methods:{
        search(){
            this.dialog = true
        }
    },

}
</script>