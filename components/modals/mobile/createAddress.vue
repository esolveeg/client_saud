<template>
  <v-row justify="center">
    <v-dialog
      v-model="mobileCreateAddressModal"
      fullscreen
      hide-overlay
      transition="slide-x-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <v-btn
            icon
            @click.prevent="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title calss="text-white">{{$t('create_address')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="create"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        > 
        <v-container>
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
                    v-model="form.BuildingNo"
                    :rules="rules.BuildingNo"
                    label="Building"
                    required
                ></v-text-field>
                <ul v-if="errors.BuildingNo && errors.BuildingNo.length > 0  ">
                    <li class="error" v-for="(err , index) in errors.BuildingNo" :key="index">
                        {{err}}
                    </li>
                </ul>
                <v-text-field
                    v-model="form.RowNo"
                    :rules="rules.RowNo"
                    label="Row"
                    required
                ></v-text-field>
                <ul v-if="errors.RowNo && errors.RowNo.length > 0  ">
                    <li class="error" v-for="(err , index) in errors.RowNo" :key="index">
                        {{err}}
                    </li>
                </ul>
                <v-text-field
                    v-model="form.FlatNo"
                    :rules="rules.FlatNo"
                    label="Flat"
                    required
                ></v-text-field>
                <ul v-if="errors.FlatNo && errors.FlatNo.length > 0  ">
                    <li class="error" v-for="(err , index) in errors.FlatNo" :key="index">
                        {{err}}
                    </li>
                </ul>
                <v-text-field
                    v-model="form.Street"
                    :rules="rules.Street"
                    label="Street"
                    required
                ></v-text-field>
                <ul v-if="errors.Street && errors.Street.length > 0  ">
                    <li class="error" v-for="(err , index) in errors.Street" :key="index">
                        {{err}}
                    </li>
                </ul>
                <v-text-field
                    v-model="form.Remark"
                    :rules="rules.Remark"
                    label="Remark"
                    required
                ></v-text-field>
                <ul v-if="errors.Remark && errors.Remark.length > 0  ">
                    <li class="error" v-for="(err , index) in errors.Remark" :key="index">
                        {{err}}
                    </li>
                </ul>

                <v-select
                :items="sections"
                item-text="AreaName"
                item-value="id"
                @change="getAreas"
                label="section"
                ></v-select>

                <v-select
                v-show="areas.length > 0"
                :items="areas"
                v-model="form.AreaNo"
                item-text="AreaName"
                item-value="id"
                label="area"
                ></v-select>
                <ul v-if="errors.AreaNo && errors.AreaNo.length > 0  ">
                    <li class="error" v-for="(err , index) in errors.AreaNo" :key="index">
                        {{err}}
                    </li>
                </ul>
                
                <v-row>
                    <v-col cols="10">
                        <v-select
                        :items="$auth.user.user.phones"
                        v-model="form.PhSerial"
                        item-text="phone"
                        item-value="id"
                        label="phone"
                        ></v-select>
                        <ul   ul v-if="errors.PhSerial && errors.PhSerial.length > 0  ">
                            <li class="error" v-for="(err , index) in errors.PhSerial" :key="index">
                                {{err}}
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols="2" class="d-flex justify-center items-center">
                        <v-btn
                            color="primary"
                            fab
                            text
                            small
                            @click.prevent="createPhone"
                            dark
                            >
                            <v-icon>mdi-plus</v-icon>
                            </v-btn>
                    </v-col>
                </v-row>
                
                <v-btn
                    color="primary"
                    class="d-block"
                    @click="create"
                    :loading="loading"
                >
                    Create
                </v-btn>
            </v-form>
        </v-container>
        </v-list>
      </v-card>
    </v-dialog>
    <modals-create-phone @created="phoneCreated"/>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'
import {form , rules , errors} from "@/utilities/address.js"
export default {
    computed : {
        ...mapGetters({
            sections: 'user/sections',
            areas: 'user/areas',
        }),
        mobileCreateAddressModal: {
            get: function() {
				return this.$store.getters['ui/mobileCreateAddressModal']
            },
            set: function(newValue) {
                this.$store.commit('ui/mobileCreateAddressModal' , newValue)
            }
        },
    },
    data () {
      return {
        sound: true,
        widgets: false,
        valid: false,

        loading: false,
        err : null,
        form ,
        errors ,
        rules ,
      }
    },
    methods:{
        close(){
            this.$store.commit('ui/mobileCreateAddressModal' , false)
        },
        phoneCreated(res){
            this.$auth.user.phones = res.phones
            this.form.PhSerial = res.id
        },
        createPhone(){
            this.$store.commit('ui/createPhoneModal' , true)
        },
        sectionSelected(item){
            console.log(item)
        },
        getAreas(id){
            if(id){
                this.$store.dispatch('user/getAreas' , id)
                return
            }
            this.$store.dispatch('user/getSections')
        },
        create(){
            this.$refs.form.validate()
            if(this.valid){
                this.loading = true
                this.$store.dispatch('user/attachAddress', this.form)
                .then(res=>{
                    this.loading = false
                    this.$store.commit('ui/mobileCreateAddressModal' , false)
                    this.form ={
                        BuildingNo : "",
                        RowNo : "",
                        FlatNo : "",
                        Street : "",
                        Remark : "",
                        Main : "",
                        AreaNo : "",
                        Main : 0,
                        PhSerial : ""
                    }

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
    },
    created(){
        this.getAreas()
    }
  }
</script>