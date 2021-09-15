<template>
    <v-bottom-navigation v-model="value" fixed>
      <v-btn v-for="(item , index) in bottomNavs" :key="index" :value="item.value" @click.prevent="goTo(item.to)"> 
        <span>{{$t(item.title)}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>


<script>
export default {
  data () {
    return {
      bottomNavs: [
        {
          title : 'home',
          value : 'index',
          to : 'index',
          icon : 'mdi-home-outline',
        },
        {
          title : 'categories',
          to : 'categories',
          value : 'categories',
          icon : 'mdi-book-multiple-outline',
        },
        {
          title : 'store',
          to : 'shop',
          value : 'shop',
          icon : 'mdi-store-outline',
        },
        {
          title : 'account',
          to : 'account',
          value : 'account',
          icon : 'mdi-account-outline',
        },
      ],
      value : '',
    }
  },
  methods:{
    goTo(to){
      if(to == 'categories'){
				this.$store.commit('ui/mobileCategoriesModal', true)

        console.log('categories')
        return 
      }
      // console.log(to)
      this.$router.push({name : `${to}___${this.$i18n.locale}`})
    },
  }
}
</script>