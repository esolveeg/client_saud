<template>
  <v-row justify="center">
    <v-dialog
      v-model="mobileCateghoriesModal"
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
          <v-toolbar-title calss="text-white">{{$t('categories')}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list
        >

        <v-list-item
          v-for="group in groups"
          :key="group.id"
          @click.prevent="applyGroup(group)"
          link
        >
          <v-list-item-title v-text="group.GroupName" v-if="$i18n.locale === 'ar'"></v-list-item-title>
          <v-list-item-title v-text="group.GroupNameEn" v-else></v-list-item-title>
        </v-list-item>
        
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import filters from '@/mixins/filters.js'
export default {
    mixins : [filters],
    methods:{
      close(){
        this.$store.commit('ui/mobileCategoriesModal' , false)

      }
    }
}
</script>