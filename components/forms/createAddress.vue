<template>  
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
            :label="$t('building')"
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
            :label="$t('row')"
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
            :label="$t('flat')"
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
            :label="$t('street')"
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
            :label="$t('remark')"

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
        :label="$t('section')"
        ></v-select>

        <v-select
        v-show="areas.length > 0"
        :items="areas"
        v-model="form.AreaNo"
        :label="$t('area')"
        item-text="AreaName"
        item-value="id"
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
                :label="$t('phone')"

                ></v-select>
                <ul v-if="errors.PhSerial && errors.PhSerial.length > 0  ">
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
            class="d-block w-full"
            @click="create"
            :loading="loading"
        >
            {{$t('create')}}
        </v-btn>
    <modals-create-phone @created="phoneCreated"/>
    </v-form>
       
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
    },
    data () {
      return {
        valid: false,
        loading: false,
        err : null,
        form ,
        errors ,
        rules ,
      }
    },
    methods:{
        getAreas(id){
            if(id){
                this.$store.dispatch('user/getAreas' , id)
                return
            }
            this.$store.dispatch('user/getSections')
            
        },
        phoneCreated(res){
            this.$auth.user.phones = res.phones
            this.form.PhSerial = res.id
        },
        createPhone(){
            this.$store.commit('ui/createPhoneModal' , true)
        },
        create(){
            this.$refs.form.validate()
            if(this.valid){
                this.loading = true
                this.$store.dispatch('user/attachAddress', this.form)
                .then(res=>{
                    this.loading = false
                    this.$emit('created' , res)
                    this.$store.commit('ui/mobileCreateAddressModal' , false)
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