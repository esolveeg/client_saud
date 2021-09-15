<template>
<v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
         v-model="mobilePointsModal"
      >
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >{{$t('your_points')}}</v-toolbar>
            <v-card-text>
              <div class="text-h6 pt-2">{{`${points} ${$tc('point', points)}`}}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="close"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
</template>

<script>
export default {
    computed : {
        mobilePointsModal: {
            get: function() {
				return this.$store.getters['ui/mobilePointsModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/mobilePointsModal' , newValue)
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
            this.$store.commit('ui/mobilePointsModal' , false)
        },
        save(){
            console.log('save')
        }
    }
  }
</script>