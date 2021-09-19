<template>
  <div>
    <v-progress-circular class="text-center" indeterminate v-if="loading"></v-progress-circular>
      <div v-else>
        <div class="d-flex justify-between  pb-4 mb-4 items-center">
          <h2 class="text-black header">{{$t('shipping_addresses')}}</h2>
          <v-btn color="primary" @click.prevent=" $store.commit('ui/createAddressModal' , true)"><v-icon>mdi-plus</v-icon>{{$t('create')}}</v-btn>
        </div>
        <v-expansion-panels  v-if="typeof addresses !== 'undefined' && addresses.length > 0">
          <v-expansion-panel
            v-for="(address,i) in addresses"
            :key="i"
          >
            <v-expansion-panel-header class="d-flex space-between">
              <span class="title">{{getTitle(address)}}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
              <v-list-item v-if="err">
                  <v-alert
                  border="top"
                  color="red lighten-2"
                  v-if="typeof err == 'string'"
                  dark
                  >
                  {{err}}
                  </v-alert>
              </v-list-item>
                <v-list class="grid">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title  :class="{hide : editId == address.id}">{{$t('building_no')}}</v-list-item-title>
                      <v-list-item-subtitle  :class="{hide : editId == address.id}">{{address.BuildingNo}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                        <v-text-field
                          v-model="form.BuildingNo"
                          :rules="rules.BuildingNo"
                          :label="$t('building_no')"
                          required
                        ></v-text-field>
                        <ul v-if="errors.BuildingNo && errors.BuildingNo.length > 0  ">
                            <li class="error" v-for="(err , index) in errors.BuildingNo" :key="index">
                                {{err}}
                            </li>
                        </ul>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title :class="{hide : editId == address.id}">{{$t('RowNo')}}</v-list-item-title>
                      <v-list-item-subtitle :class="{hide : editId == address.id}">{{address.RowNo}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                        <v-text-field
                          v-model="form.RowNo"
                          :rules="rules.RowNo"
                          :label="$t('RowNo')"
                          required
                        ></v-text-field>
                        <ul v-if="errors.RowNo && errors.RowNo.length > 0  ">
                            <li class="error" v-for="(err , index) in errors.RowNo" :key="index">
                                {{err}}
                            </li>
                        </ul>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title :class="{hide : editId == address.id}">{{$t('FlatNo')}}</v-list-item-title>
                      <v-list-item-subtitle :class="{hide : editId == address.id}">{{address.FlatNo}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                        <v-text-field
                          v-model="form.FlatNo"
                          :rules="rules.FlatNo"
                            :label="$t('FlatNo')"
                          required
                        ></v-text-field>
                        <ul v-if="errors.FlatNo && errors.FlatNo.length > 0  ">
                            <li class="error" v-for="(err , index) in errors.FlatNo" :key="index">
                                {{err}}
                            </li>
                        </ul>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title :class="{hide : editId == address.id}">{{$t('Street')}}</v-list-item-title>
                      <v-list-item-subtitle :class="{hide : editId == address.id}">{{address.Street}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                        <v-text-field
                          v-model="form.Street"
                          :rules="rules.Street"
                            :label="$t('Street')"
                          required
                        ></v-text-field>
                        <ul v-if="errors.Street && errors.Street.length > 0  ">
                            <li class="error" v-for="(err , index) in errors.Street" :key="index">
                                {{err}}
                            </li>
                        </ul>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title :class="{hide : editId == address.id}">{{$t('Remark')}}</v-list-item-title>
                      <v-list-item-subtitle :class="{hide : editId == address.id}">{{address.Remark}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                        <v-text-field
                          v-model="form.Remark"
                          :rules="rules.Remark"
                            :label="$t('Remark')"
                          required
                        ></v-text-field>
                        <ul v-if="errors.Remark && errors.Remark.length > 0  ">
                            <li class="error" v-for="(err , index) in errors.Remark" :key="index">
                                {{err}}
                            </li>
                        </ul>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title :class="{hide : editId == address.id}">{{$t('Section')}}</v-list-item-title>
                      <v-list-item-subtitle :class="{hide : editId == address.id}">{{address.SectionName}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                        <v-select
                          :items="sections"
                          item-text="AreaName"
                          v-model="SectionNo"
                          item-value="id"
                          @change="getAreas"
                            :label="$t('Section')"
                          ></v-select>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title :class="{hide : editId == address.id}">{{$t('AreaNo')}}</v-list-item-title>
                      <v-list-item-subtitle :class="{hide : editId == address.id}">{{address.AreaName}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                        <v-select
                          v-show="areas.length > 0"
                          :items="areas"
                          v-model="form.AreaNo"
                          item-text="AreaName"
                          item-value="id"
                            :label="$t('AreaNo')"
                          ></v-select>
                          <ul v-if="errors.AreaNo && errors.AreaNo.length > 0  ">
                              <li class="error" v-for="(err , index) in errors.AreaNo" :key="index">
                                  {{err}}
                              </li>
                          </ul>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title :class="{hide : editId == address.id}">{{$t('PhSerial')}}</v-list-item-title>
                      <v-list-item-subtitle :class="{hide : editId == address.id}">{{address.Phone}}</v-list-item-subtitle>
                      <div class="input" :class="{show : editId == address.id}">
                          <v-select
                            :items="$auth.user.user.phones"
                            v-model="form.PhSerial"
                            item-text="phone"
                            item-value="id"
                            :label="$t('PhSerial')"
                            ></v-select>
                          <ul v-if="errors.PhSerial && errors.PhSerial.length > 0  ">
                                <li class="error" v-for="(err , index) in errors.PhSerial" :key="index">
                                    {{err}}
                                </li>
                            </ul>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              
                <div class="actions d-flex">
                    <v-btn
                      class="w-full mx-2"
                      dark
                      :class="{show : editId == address.id}"
                      elevation="5"
                      @click.prevent="editAction()"
                      :loading="editLoading"
                      color="primary"
                    >
                      <v-icon >
                        mdi-check
                      </v-icon>
                      {{$t('done')}}
                    </v-btn>
                    <v-btn
                      class="w-full close mx-2"
                      fab
                      dark
                      :class="{show : editId == address.id}"
                      small
                      elevation="5"
                      @click.prevent="closeEdit()"
                      color="danger"
                    >
                      <v-icon dark>
                        mdi-close
                      </v-icon>
                    </v-btn>
                  <div :class="{hide : editId == address.id}" class="btn_wrapper">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      elevation="5"
                      @click.prevent="edit(address)"
                      color="primary"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      elevation="5"
                      @click.prevent="remove(address.id)"
                      color="danger"
                    >
                      <v-icon dark>
                        mdi-trash-can-outline
                      </v-icon>
                    </v-btn>

                  </div>
                </div>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div v-else class="no-products" > 
          <v-icon x-large class="remove-icon">
            mdi-map-marker-remove-outline
          </v-icon>
          <span class="text-large">{{$t('no_addresses')}}</span>
          <v-btn @click.prevent="create" color="primary">{{$t('create_new_address')}} <v-icon dark>mdi-plus</v-icon></v-btn>
        </div>
      </div>
    <modals-create-address/>
    <!-- <modals-mobile-edit-address/> -->
    <modals-delete-address/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getAddressTitle} from '@/utilities/helpers.js'
import {form , rules , errors} from "@/utilities/address.js"
export default {
    computed : {
      ...mapGetters({
        addresses: 'user/addresses',
        loading: 'user/addressesLoading',
        sections: 'user/sections',
        areas: 'user/areas',
      }),
      mobileAddressesModal: {
        get: function() {
          return this.$store.getters['ui/mobileAddressesModal']
        },
        set: function(newValue) {
            this.$store.commit('ui/mobileAddressesModal' , newValue)
        }
      },

    },
    data () {
      return {
        sound: true,
        widgets: false,
        valid: true,
        err : null,
        editId : null,
        SectionNo : null,
        editLoading: false,
        form ,
        errors ,
        rules ,
      }
    },
    methods:{
        close(){
          console.log('asd')
          this.$store.commit('ui/mobileAddressesModal' , false)
        },
        editAction(){
          this.editLoading = true
          this.$store.dispatch('user/editAddress', {address :this.form , id: this.editId})
          .then(()=>{
              this.editLoading = false
              this.editId = null
          })
          .catch(e => {
              this.msg = e
              this.editLoading = false
          }); 
        },
        getAreas(id){
            if(id){
                this.$store.dispatch('user/getAreas' , id)
                    .then(()=>{
                        console.log(this.areas)
                    });
                return
            }
            this.$store.dispatch('user/getSections')
            .then(()=>{
                console.log(this.sections)
            });
        },
        getTitle(address){
          return getAddressTitle(address)
        },
        
        create(){
          this.$store.commit('ui/createAddressModal' , true)
        },
        getUserAddresses(){
          this.$store.dispatch('user/getAddresses')
        },
        deleteAddress(id){
          this.$store.dispatch('user/deleteAddress' , id).then(()=>{
              this.$notify({
                  group: 'addCartSuccess',
                  title: 'Success!',
                  text: `Address has been deleted successfully`
              });
              this.$store.dispatch('user/getAddresses')

          })
        },
        closeEdit(){
          this.editId = null
        },
        remove(id){
          this.$store.commit("ui/deleteAddressModal" , {active : true , id})
          console.log(id)
        },
        edit(address){
          console.log(address.id)
          this.form = address
          this.getAreas(address.SectionNo)
          this.SectionNo = address.SectionNo
          // this.getAreas()
          this.editId = address.id
        }
    },
    created() {
        this.getUserAddresses()
    }
  }
</script>

<style scoped>
.v-list-item__title, .v-list-item__subtitle{
  /* flex : 0 auto */
}
.v-list-item__title::after{
  content :" : ";
  text-align: right;
  margin-right: 10px;
}
.actions{
  text-align: right;
  /* overflow: hidden; */
  /* justify-content: flex-end; */
}
.v-list.grid{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(4,100px);
}

.v-list.grid .v-list-item .v-list-item__content{
  align-self: flex-end !important;
}

.v-btn > .v-btn__content .v-icon{
  color:#fff !important
}
.w-full{
    transition: all .3s ease-in-out;
    flex: 0 0 0;
    min-width:0 !important ;
    padding: 0 !important;
}
.input{
  transition-delay: .4s;
  transition : all .3s ease-in-out;
  width: 0;
  height: 0;
  opacity: 0;
}
.input.show{
  width: 100%;
  height: 100%;
  opacity: 1;

}
.w-full.show{
  flex: 0 0 80%;
  padding: 0 16px;
}
.close.show{
    flex: 0 0 40px !important;


}
.hide{
  transition: all .3s ease-in-out;
  transition-delay: .2s;
  width: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateX(100%) !important;
}
.btn_wrapper{
  display: flex;
  justify-content: flex-end;
  width: 100%;
  text-align: right;
}
</style>