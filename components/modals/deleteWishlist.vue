<template>
<v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
      v-model="deleteWishlistModal.active"
  >
          <v-card>
            <v-toolbar
              color="danger"
              dark
            >{{$t('are_you_sure_delete_wishlist_item')}}</v-toolbar>
            <v-card-text>
             
            </v-card-text>
            <v-card-actions class="justify-end">
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
</template>

<script>
export default {
    computed : {
        deleteWishlistModal: {
            get: function() {
				      return this.$store.getters['ui/deleteWishlistModal']
            },
            set: function(newValue) {
              this.$store.commit('ui/deleteWishlistModal' , newValue)
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
            console.log('asd')
            this.$store.commit('ui/deleteWishlistModal' , false)
        },
        remove(){
           this.$store.dispatch('wishlist/remove' , this.deleteWishlistModal.id)
        },
        save(){
            console.log('save')
        }
    }
  }
</script>