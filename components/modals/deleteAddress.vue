<template>
<div>
  <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="deleteAddressModal.active"
      >
          <v-card>
            <v-toolbar
              color="danger"
              dark
            >
            {{$t('are_you_sure_delete_address')}}
          </v-toolbar>
            <v-card-text></v-card-text>
            <v-card-actions  class="justify-end">
              <v-btn
                text
                @click="close"
              >
              <v-icon>mdi-close</v-icon>
              {{$t('close')}}</v-btn>
              <v-btn
                text
                @click="remove"
                class="danger"
                
              >
              <v-icon>mdi-trash-can-outline</v-icon>
              
              {{$t('sure')}}</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    <modals-delete-address-restricted/>
    </div>
</template>

<script>
export default {
    computed : {
        deleteAddressModal: {
            get: function() {
				      return this.$store.getters['ui/deleteAddressModal']
            },
            set: function(newValue) {
              this.$store.commit('ui/deleteAddressModal' , newValue)
            }
        },
        
    },
    data () {
      return {
        sound: true,
        widgets: false,
      }
    },
    methods:{
        close(){
            this.$store.commit('ui/deleteAddressModal' , {active : false , id : null})
        },
        remove(){
           this.$store.dispatch('user/deleteAddress' , this.deleteAddressModal.id)
           .catch(e => {
            this.$store.commit('ui/deleteAddressModal' , {active : false , id : null})
              const snackbar = {
                    active : true,
                    text: 'cant_delete_address'
              }
              this.$store.commit('ui/setSnackbar' , snackbar)
           })
        },
        save(){
            console.log('save')
        }
    },
  }
</script>