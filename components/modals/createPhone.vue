<template>
<v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
         v-model="createPhoneModal"
      >
          <v-card>
            <v-toolbar
              color="danger"
              dark
            >{{$t('create_new_phone')}}</v-toolbar>
            <v-card-text>
                <v-form
                  ref="form"
                  class="mt-2"
                  v-model="valid"
                  lazy-validation
                >
                  <div class="mb-10" v-if="err">
                    <v-alert
                      border="top"
                      color="red lighten-2"
                      v-if="typeof err == 'string'"
                      dark
                    >
                      {{err}}
                    </v-alert>
                  </div>''
                  <v-text-field
                    v-model="form.phone"
                    :rules="rules.phone"
                    :label="$t('phone')"
                    required
                  ></v-text-field>
                  <div  class="err-list" v-if="errors  && errors.phone">
                    <ul>
                      <li class="error" v-for="(err , index) in errors.phone" :key="index">
                          {{err}}
                      </li>
                    </ul>
                  </div>

                </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                    color="primary"
                    class="d-block"
                    @click.prevent="update"


                    :loading="loading"
                  >
              <v-icon>mdi-check</v-icon>

                    Done
                  </v-btn>
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
        createPhoneModal: {
            get: function() {
				      return this.$store.getters['ui/createPhoneModal']
            },
            set: function(newValue) {
              this.$store.commit('ui/createPhoneModal' , newValue)
            }
        },

    },
    data () {
      return {
        sound: true,
        points : 300,
        loading:false,
        valid:false,
        err:null,
        form:{
          phone : "",
        },
      rules :{
         Phone:  [
          v => !!v || 'Phone is required',
          v => isNumric(v) || 'Phone must be number',
          // v => (v && v.length >= 6) || 'Password must be greater than or equal 6 characters',
        ],
      },
      errors : {
          phone : [],
      },
        widgets: false,
      }
    },
    methods:{
        close(){
            console.log('asd')
            this.$store.commit('ui/createPhoneModal' , false)
        },
        remove(){
           this.$store.dispatch('user/deleteAddress' , this.createPhoneModal.id)
        },
        save(){
            console.log('save')
        },
        update(){
                this.loading = true
                this.$store.dispatch('user/addPhone', this.form)
                .then(res =>{
                    this.loading = false
                    this.$store.commit('ui/createPhoneModal' , false)
                    this.$auth.fetchUser()

                    this.$emit('created' , res)
                })
                .catch(e => {
                    if(typeof e == 'string'){
                        this.err = e
                    } else {
                        this.errors = e
                    }
                    this.loading = false
                });
        }
    },
    mounted(){
      this.form = {
        name : this.$auth.user.user.name,
        email : this.$auth.user.user.email,
        password : ''
      }
    }
  }
</script>