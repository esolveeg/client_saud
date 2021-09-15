<template>
  <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
         v-model="deleteAddressModalRestricted.active"
      >
          <v-card>
            <v-toolbar
              color="danger"
              dark
            >
            {{$t('delete_restricted')}}
          </v-toolbar>
            <v-card-text >
             {{$t('cant_delete_address')}}
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="close"
              >
              <v-icon>mdi-close</v-icon>
              {{$t('close')}}</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
</template>

<script>
export default {
    computed : {
        deleteAddressModalRestricted: {
            get: function() {
				      return this.$store.getters['ui/deleteAddressModalRestricted']
            },
            set: function(newValue) {
              this.$store.commit('ui/deleteAddressModalRestricted' , newValue)
            }
        },
        
    },
    data () {
      return {
        sound: true,
        points : 300,
        widgets: false,
      }
    },
    methods:{
        close(){
            this.$store.commit('ui/deleteAddressModalRestricted' , {active : false , id : null})
        },
    },
  }
</script>