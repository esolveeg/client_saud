<template>
    <footer class="footer">
        <v-container>
            <v-row class="content">
                <v-col class="about" cols="3">
                    <div class="logo">
                        <img :src="settings.logo" alt="el rady logo">
                    </div>
                    <p v-if="$i18n.locale == 'en'">{{settings.about}}</p>
                    <p v-if="$i18n.locale == 'ar'">{{settings.about_ar}}</p>
                    <ul class="contacts">
                        <li v-if="$i18n.locale == 'en'">
                            <v-icon>mdi-map-marker-outline</v-icon>
                            {{settings.address}}
                        </li>

                        <li v-else>
                            <v-icon>mdi-map-marker-outline</v-icon>
                            {{settings.address_ar}}
                        </li>
                        <li v-for="(contact,index) in contacts" :key="index">
                            <v-icon>mdi-{{contact.icon}}</v-icon>
                            {{contact.title}}
                        </li>

                    </ul>
                </v-col>
                <v-col cols="9">
                    <v-row class="right">
                        <v-col cols="12" class="newsletter">
                            <h2>{{$t('news_letter')}}</h2>
                            <p>{{$t('news_letter_content')}}</p>
                            
                            <v-flex class="newsletter__form">
                                <div class="input">
                                    <v-text-field
                                        :label="$t('email')"
                                        rounded
                                        dense
                                        color="black"
                                        hide-details="auto"
                                        ></v-text-field>
                                </div>
                                <div class="btn">
                                     <v-btn height="30" dense color="primary" @click.prevent="$emit('clicked')">
                                            {{$t('subscribe_now')}}
                                            <v-icon>mdi-arrow-right</v-icon>
                                        </v-btn>
                                </div>
                            </v-flex>
                        </v-col>
                        <v-col cols="4" class="list">
                            <h2 class="title">{{$t('stay_connected')}}</h2>
                            <ul>
                                <a :href="link.url" target="_blank" class="d-block mb-4" v-for="(link , index) in links" :key="index">
                                    <v-icon small>mdi-{{link.icon}}</v-icon>
                                    {{link.title}}
                                </a>
                            </ul>
                        </v-col>
                        <v-col cols="4" class="list">
                            
                            <h2 class="title">{{$t('categories')}}</h2>
                            <ul>
                                <li v-for="group in groups" :key="group.id">
                                    <v-icon small>mdi-{{group.icon}}</v-icon>
                                    <a @click.prevent="setGroup(group)" v-if="$i18n.locale === 'ar'">
                                        {{group.GroupName}}
                                    </a>
                                    <a @click.prevent="setGroup(group)" v-else>
                                        {{group.GroupNameEn}}
                                    </a>
                                </li>
                            </ul>
                        </v-col>
                        <v-col cols="4" class="list">
                            
                            <h2 class="title">{{$t('my_account')}}</h2>
                            <ul>
                                <li v-for="(item , index) in accountItems" @click.prevent="item.action" :key="index">
                                     <v-icon small>mdi-{{item.icon}}</v-icon>
                                    {{$t(item.text)}}
                                </li>
                            </ul>

                        </v-col>
                       
                    </v-row>
                </v-col>
                <v-col class="copyrights" cols="12">
                   <span> {{$t('copyrights')}}</span>
                </v-col>
                
            </v-row>
        </v-container>
    </footer>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters({
              groups: 'group/groups',
              loading: 'group/loading',
              filters: 'product/filters',
              address : 'global/address',
              logo : 'global/logo',
              email : 'global/email',
              phone : 'global/phone',
              filtersParams: 'product/filtersParams',
              links : 'global/links',
              contacts: 'global/contacts',
              settings : 'global/settings'
              
            }),
    },
    data(){
        return{
            accountItems: [
                {  text: 'order_history', icon: 'calendar-blank' , action : ()=>{this.$router.push({name :  `account___${this.$i18n.locale}`, query :{tab : 0}})}  },
                {  text: 'wishlist', icon: 'heart-outline' , action : ()=>{this.$router.push({name :  `account___${this.$i18n.locale}`, query :{tab : 1} })} },
                {  text: 'shipping_addresses', icon: 'office-building-marker-outline' , action : ()=>{this.$router.push({name : `account___${this.$i18n.locale}` , query :{tab : 2} })} },
                {  text: 'my_cart', icon: 'cart-arrow-down' , action : ()=>{this.$router.push({name : `shop-cart___${this.this.$i18n.locale}`})} },
            ],
        }
    },
    methods:{
        setGroup(group){
            
            const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
            const groupFilter = {
                id : group.id,
                name
            }
            const localFilters = {
                price : [],
                group : groupFilter
            }
            
            this.$store.commit('product/filters' , localFilters)
             if(this.$route.name !== `shop___${this.$i18n.locale}`){
                 this.$router.push({name : `shop___${this.$i18n.locale}` , query : {group : group.id}})
             } else {
                 this.addParamsToLocation(this.filtersParams)
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
    }
}
</script>
<style scoped src="@/assets/scss/layouts/footer.css"/>
