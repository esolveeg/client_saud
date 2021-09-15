<template>
<v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
         v-model="editAccountModal"
      >
          <v-card>
            <v-toolbar
              color="danger"
              dark
            >{{$t('edit_your_account')}}</v-toolbar>
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
                  </div>
                  <v-text-field
                    v-model="form.email"
                    :rules="rules.email"
                    :label="$t('email')"
                    required
                  ></v-text-field>
                  <div  class="err-list" v-if="err && err.email">
                    <ul>
                      <li class="error" v-for="(err , index) in err.email" :key="index">
                          {{err}}
                      </li>
                    </ul>
                  </div>
                  <v-text-field
                    v-model="form.name"
                    :rules="rules.name"
                    :label="$t('name')"

                    required
                  ></v-text-field>
                  <div  class="err-list" v-if="err && err.name">
                    <ul>
                      <li class="error" v-for="(err , index) in err.name" :key="index">
                          {{err}}
                      </li>
                    </ul>
                  </div>
                  <v-text-field
                    v-model="form.password"
                    type="password"
                    :label="$t('password')"
                    :rules="rules.password"
                    hint="leave_it_blank"
                    required
                  ></v-text-field>
                  <div  class="err-list" v-if="err && err.password">
                    <ul>
                      <li class="error" v-for="(err , index) in err.password" :key="index">
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

                    {{$t('done')}}
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
        editAccountModal: {
            get: function() {
				      return this.$store.getters['ui/editAccountModal']
            },
            set: function(newValue) {
              this.$store.commit('ui/editAccountModal' , newValue)
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
          name : "",
          email : "",
          password : "",
        },
      rules :{
        name : [
            v => !!v || 'Name Field is required',
            //  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
        
        email : [
            v => !!v || 'Email  Field is required',
            //  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
        password:  [
          // v => !!v || 'Password is required',
          // v => (v && v.length >= 6) || 'Password must be greater than or equal 6 characters',
        ],
      },

   errors : {
    name : [],
    email : [],
    password: [],
},
        widgets: false,
      }
    },
    methods:{
        close(){
            console.log('asd')
            this.$store.commit('ui/editAccountModal' , false)
        },
        remove(){
           this.$store.dispatch('user/deleteAddress' , this.editAccountModal.id)
        },
        save(){
            console.log('save')
        },
        update(){
                this.loading = true
                this.$store.dispatch('user/editAccount', this.form)
            .then(async ()=>{
                this.loading = false
                await this.$auth.fetchUser()
                this.$store.commit('ui/editAccountModal' , false)
                
            })
            .catch(e => {
                this.msg = e
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