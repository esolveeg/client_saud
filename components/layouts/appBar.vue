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
        <v-btn
            icon
            v-if="$i18n.locale == 'en'"
            @click.prevent="switchLanguage"
        >
            <v-icon>mdi-abjad-arabic</v-icon>
        </v-btn>
        <v-btn
            icon
            v-else
            @click.prevent="switchLanguage"
        >
            <v-icon large>mdi-alpha-e</v-icon>
        </v-btn>
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
        switchLanguage(){
            const locale = this.$i18n.locale === 'en' ? 'ar' : 'en'
            if(locale == 'ar'){
                this.$vuetify.rtl = true
            } else {
                this.$vuetify.rtl = false

            }
            this.$router.push({name : `index___${locale}`})
        },
        search(){
            this.dialog = true
        }
    },

}
</script>