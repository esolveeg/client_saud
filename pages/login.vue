<template>
  <v-container>
    <div class="title my-4">
      {{$t('login_to_your_account')}}
    </div>
      
    <v-form
      ref="form"
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
        v-model="form.emailOrPhone"
        :rules="rules.emailOrPhone"
        ref="email"
        @keyup.enter="$refs.password.focus()"
        :label="$t('email')"
        required
      ></v-text-field>
      <div  class="err-list" v-if="err && err.emailOrPhone">
        <ul>
          <li class="error" v-for="(err , index) in err.emailOrPhone" :key="index">
              {{err}}
          </li>
        </ul>
      </div>
      <v-text-field
        v-model="form.password"
        :rules="rules.password"
        type="password"
        :label="$t('password')"
        ref="password"
        @keyup.enter="login()"
        required
      ></v-text-field>
      <div  class="err-list" v-if="err && err.password">
        <ul>
          <li class="error" v-for="(err , index) in err.password" :key="index">
              {{err}}
          </li>
        </ul>
      </div>
      <div class="no-account">
        {{$t('no_account')}}
        <nuxt-link :to="{name :`register___${$i18n.locale}`}">{{$t('register_now')}}</nuxt-link>

      </div>
      <v-btn
        color="primary"
        class="d-block"
        @click="login"
      
        :loading="loading"
      >
        {{$t('login_button')}}
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  export default {
      layout :'auth',

    data: () => ({
      valid: true,
      loading: false,
      err : null,
      errors :{
        email : [],
        password : [],
      },
      form : {
        emailOrPhone : 'test@saud.com',
        password: '123456',
      },
      rules :{
        emailOrPhone : [
            v => !!v || 'Email Or Phone Field is required',
            //  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
        password:  [
          v => !!v || 'Password is required',
          // v => (v && v.length >= 6) || 'Password must be greater than or equal 6 characters',
        ],
      }
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      login () {
        this.$refs.form.validate()
        if(this.valid){
          this.loading  = true
          this.$auth
            .loginWith('local', { data: this.form })
            .then(()=>{
                const snackbar = {
                    active : true,
                    text: 'logged_in'
                }
                this.$store.commit('ui/setSnackbar' , snackbar)
                this.loading  = false
                if(localStorage.getItem('product')){
                    const payload = {
                        product : localStorage.getItem('product'),
                        qty : localStorage.getItem('qty')
                    }
                    this.$store.dispatch('cart/create' , payload)
                    .then(() => {
                        localStorage.removeItem('product')
                        localStorage.removeItem('qty')
                    })
                }
                this.isLoading = false

            }).catch(e => {
             console.log(e)
              this.loading  = false

            })  
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>