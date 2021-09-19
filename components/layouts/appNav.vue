
<template>
    <nav class="nav">
        <div class="top">
            <v-container>
                <div class="d-flex items-center space-between w-full">
                   <ul class="d-flex left">
                       <li v-if="$i18n.locale == 'en'">
                            <v-icon>mdi-map-marker-outline</v-icon>
                            {{settings.address}}
                        </li>
                        <li v-else>
                            <v-icon>mdi-map-marker-outline</v-icon>
                            {{settings.address_ar}}
                        </li>
                   </ul>
                    <ul class="d-flex right">
                        <li class="b-right pointer"  v-if="$auth.loggedIn" @click.prevent="$router.push({name : `account___${$i18n.locale}`})">
                            <a>
                                <v-icon >
                                    mdi-account-outline
                                </v-icon>
                                {{$auth.user.user.name}}
                            </a>
                        </li>
                        <li class="b-right pointer"  v-else @click.prevent="$router.push({name : `login___${$i18n.locale}`})">
                            <a>
                                
                                    <v-icon >
                                        mdi-account-outline
                                    </v-icon>
                               
                            {{$t('login-rgister')}}
                            </a>
                        </li>
                        <li class="b-right"  @click.prevent="$router.push({name : `shop-cart___${$i18n.locale}`})">
                            <!-- <v-icon class="mr-2" >mdi-cart-arrow-down</v-icon> -->
                            <a
                            >
                                <v-badge
                                    :content="count"
                                    :value="count"
                                    color="primary"
                                    left
                                    
                                >
                                    <v-icon >
                                    mdi-cart-arrow-down
                                    </v-icon>
                                </v-badge>
                            {{$t('cart')}}
                            </a>
                        </li>
                    </ul>
                </div>
            </v-container>
        </div>
        <div class="bottom" ref="nav">
            <v-container>
                <div class="nav d-flex space-between items-center">
                    <nuxt-link to="/" class="logo">
                        <img :src="settings.logo">
                    </nuxt-link>

                    <div class="links">
                        <ul class="d-flex">
                            <li>
                                <nuxt-link :to="{name: `index___${$i18n.locale}`}" >
                                    {{$t('home')}}
                                </nuxt-link>
                            </li>
                            <li>
                                <a @click.prevent="goToStore()" >
                                    {{$t('Store')}}
                                </a>
                            </li>
                             <li v-for="group in groups" :key="group.id">
                                <a @click.prevent="setGroup(group)">
                                    {{group.GroupName}}
                                </a>
                            </li>
                          
                        </ul>
                    </div>
                    <div class="search">
                        <layouts-search/>
                    </div>
                </div>
            </v-container>
        </div>
    </nav>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            items : ['asd'],
            isLoading : false,
            term : '',
        }
    },
    watch:{
        term: newVal => {
            console.log(newVal)
        } 
    },
    methods: {
        handleScroll () {
        // Your scroll handling here
            if(window.scrollY > 145){
                this.$refs.nav.classList.add('fixed')
                // document.querySelector('main.v-main').classList().add('fixed-nav')
            } else {
                this.$refs.nav.classList.remove('fixed')
                // document.querySelector('main.v-main').classList().remove('fixed-nav')

            }
        },
        search(val){
            console.log('asd')
            console.log(val)
        },
        setGroup(group){
            
            const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
            const groupFilter = {
                id : group.id,
                name
            }
           this.$store.commit('product/groupFilter' , groupFilter)
            if(this.$route.name !== `shop___${this.$i18n.locale}`){
                 this.$router.push({name : `shop___${this.$i18n.locale}` , query : {group : group.id}})
             } else {
                  let query = this.$route.query
                    query.group = group.id
                 this.addParamsToLocation(query)
             }
        },
        goToStore(){
           this.$store.commit('product/groupFilter' , {  name : null,  id : null})
           this.$store.commit('product/priceFrom' , null)
           this.$store.commit('product/priceTo' , null)
           if(this.$route.name !== `shop___${this.$i18n.locale}`){
                this.$router.push({name : `shop___${this.$i18n.locale}` , query : {}})
            } else {
                this.addParamsToLocation({})
            }
        },
        addParamsToLocation(params) {
        this.$store.dispatch('product/getProducts' , params)
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
        window.scrollTo({ top:0, behavior: 'smooth'});
        },
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    computed:{
        ...mapGetters({
            count: 'cart/cartCount',
              groups: 'group/groups',
            loading: 'product/loading',
            filtersParams: 'product/filtersParams',
            links : 'global/links',
            settings : 'global/settings'

        })
    },
    addParamsToLocation(params) {
        this.$store.dispatch('product/getProducts' , params)
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
        window.scrollTo({ top:0, behavior: 'smooth'});
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
<style scoped src="@/assets/scss/layouts/nav.css"/>
