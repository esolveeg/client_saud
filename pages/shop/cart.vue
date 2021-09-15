<template>

  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-stepper alt-labels v-model="el">
          <v-container>     
            <v-stepper-header>
              <v-stepper-step
                :complete="!completed && el > 3"
                step="1"
              >
                {{ $t('cart')}}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="!completed &&  el > 2"
                step="2"
              >
                {{ $t('shipping')}}
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">
                {{ $t('done')}}
              </v-stepper-step>
            </v-stepper-header>
          </v-container>

        <v-stepper-items>
          <v-stepper-content step="1">
            <shop-cart @clicked="clicked"/>
          </v-stepper-content>

          <v-stepper-content step="2">
            <shop-shipping  @finished="finished" @back="back"/>
          </v-stepper-content>

          <v-stepper-content step="3">
             <div cols="12" class="no-products" > 
                <v-icon x-large class="remove-icon">
                  mdi-cart-check
                </v-icon>
                <span class="text-large title mb-0">{{$t('thank_you')}}</span>
                <span class="mb-4">{{$t('order_done_note')}}</span>
                <v-btn @click.prevent="$router.push({name : `shop___${$i18n.locale}`})" color="primary">{{$t('continue_shopping')}} <v-icon dark>mdi-arrow-right</v-icon></v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>

</template>

<script>

export default {
  data () {
    return {
      el:1,
      completed : false,
    }
  },
  methods:{
    clicked(){
      window.scrollTo({ top:0, behavior: 'smooth'});
      this.el = 2
      console.log(this.el)
    },
    back(){
      window.scrollTo({ top:0, behavior: 'smooth'});
      this.el--
    },
    finished(){
      window.scrollTo({ top:0, behavior: 'smooth'});
      this.el = 3
      this.completed = true
    }
  },

  middleware: 'auth',
  mounted(){
    console.log(this.$route.name)
  }
}
</script>
