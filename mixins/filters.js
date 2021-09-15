import {mapGetters} from 'vuex'

export default {
    computed : {
        mobileFiltersModal: {
            get: function() {
				      return this.$store.getters['ui/mobileFiltersModal']
            },
            set: function(newValue) {
              this.$store.commit('ui/mobileFiltersModal' , newValue)
            }
        },
        mobileCateghoriesModal: {
            get: function() {
				      return this.$store.getters['ui/mobileCateghoriesModal']
            },
            set: function(newValue) {
              this.$store.commit('ui/mobileCategoriesModal' , newValue)
            }
        },
        ...mapGetters({
          groups: 'group/groups',
          loading: 'group/loading',
          filters: 'product/filters',
          filtersParams: 'product/filtersParams',
        }),
    },
    data: () => ({
      price: [0, 500],
      chip1:true,
      localFilters:{
        price : [],
        group: {
          id : null,
          name : null,
        },
      },
    }),
    methods:{
      apply(){
        this.$store.commit('product/filters' , this.localFilters)
        this.addParamsToLocation(this.filtersParams)
        this.mobileFiltersModal  = false
        this.mobileCateghoriesModal  = false
      },
      clearFilter(filter){
        if(filter == 'group'){
          const gr = {id : null,name : null}
          this.localFilters.group = gr
          this.$store.commit('product/filtersGroup' , gr )
        }

        if(filter == 'price'){
          this.localFilters.price = []
          this.$store.commit('product/filtersPrice' , [])
        }
        this.addParamsToLocation(this.filtersParams)
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
      setGroup(group){
        const name = this.$i18n.locale == 'ar' ? group.GroupName : group.GroupNameEn
        const groupFilter = {
          id : group.id,
          name
        }
        this.localFilters.group =  groupFilter
        this.$store.commit('product/groupFilter' , groupFilter)
      },
      applyGroup(group){
        if(this.$route.name == `shop___${this.$i18n.locale}`){
          this.setGroup(group)
          this.apply()
        } else {
          this.$router.push({name : `shop___${this.$i18n.locale}` , query : {group : group.id}})
        }
        this.mobileCateghoriesModal = false
      },
      setFilters(arr){
        let filters = {
          price : [],
          group: {
            id : null,
            name : null,
          },
        }
        arr.group ? filters.group.id = arr.group : ''
        arr.priceFrom ? filters.price[0] = arr.priceFrom : ''
        arr.priceFrom ? this.price[0] = arr.priceFrom : ''
        arr.priceTo ? filters.price[1] = arr.priceTo : ''
        arr.priceTo ? this.price[1] = arr.priceTo : ''
        this.$store.commit('product/filters' , filters)
      },
      setPrice(){
        this.localFilters.price =  this.price
      }
    },
    
    created(){
      console.log(this.$route.query)
      const query = this.$route.query
      this.setFilters(query)
      this.$store.dispatch('group/get').then(() => {
        if(query.group){
          const selected = this.groups.filter(group => {
            return group.id == query.group ? group : ''
          })
          // console.log('selected')
          // console.log(selected)
          this.filters.group.name = this.$i18n.locale == 'ar' ?  selected[0].GroupName : selected[0].GroupNameEn
        }
      })
    }
}