<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <div class="title my-4">
            {{$t('create_account')}}
          </div>
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
        v-model="form.phone"
        :rules="rules.phone"
        :label="$t('phone')"
        required
      ></v-text-field>
      <div  class="err-list" v-if="err && err.phone">
        <ul>
          <li class="error" v-for="(err , index) in err.phone" :key="index">
              {{err}}
          </li>
        </ul>
      </div>
      <v-text-field
        v-model="form.password"
        :rules="rules.password"
        type="password"
        @keyup.prevent="register"
        :label="$t('password')"
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
        {{$t('have_account')}}
        <nuxt-link :to="{name :`login___${$i18n.locale}`}">{{$t('login_now')}}</nuxt-link>

      </div>
      <v-btn
        color="primary"
        class="d-block"
        @click="register"
      
        :loading="loading"
      >
        {{$t('register')}}
      </v-btn>
    </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      loading: false,
      layout : 'auth',
      err : null,
      errors :{
        email : [],
        name : [],
        phone :[],
        password : [],
      },
      form : {
        email : 'test@test2.com',
        phone : '0102205246',
        name : 'test name',
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
        name:  [
          v => !!v || 'Name is required',
          // v => (v && v.length >= 6) || 'Password must be greater than or equal 6 characters',
        ],
        Phone:  [
          v => !!v || 'Phone is required',
          v => isNumric(v) || 'Phone must be number',
          // v => (v && v.length >= 6) || 'Password must be greater than or equal 6 characters',
        ],
      }
    }),
  layout:'auth',
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      register () {
        this.$refs.form.validate()
        if(this.valid){
          this.loading  = true
          this.$store.dispatch('myAuth/register', this.form)
                .then(async () => {   
                    await this.$auth.loginWith('local', { data: {emailOrPhone : this.form.email , password :this.form.password} })
                    this.$router.push('/')
                    this.loading = false
                })
                .catch(e => {
                    this.err = e
                    this.loading = false
                });
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>