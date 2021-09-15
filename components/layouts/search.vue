<template>
  <div class="relative">
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        rounded
        flat
        hide-details
        hide-no-data
        hide-selected
        item-text="ItemName"
        item-value="id"
        :placeholder="$t('search_key')"
        prepend-icon="mdi-magnify"
        class="bg-black"
        return-object
        dense
      ></v-autocomplete>
    <v-expand-transition>
      <v-card v-if="model "  class="absolute">
        <v-list v-if="items.length > 0">
          <partials-search-product :product="item"
            v-for="(item, i) in items"
            :key="i"
          >
            {{item}}
          </partials-search-product>
        </v-list>
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script>
  export default {
    data: () => ({
      descriptionLimit: 60,
      items: [],
      isLoading: false,
      model: null,
      search: null,
    }),


    watch: {
      search (val) {
        this.model = true
        
        // // Items have already been requested
        if (this.isLoading) return


        // // no search
        if (val == '') {
          this.items = []
          return
        }

        // this.isLoading = true

        // // Lazily load input items
        // console.log(val)
        this.$store.dispatch('product/searchProducts' , val)
          .then(res => {
            this.items  = res.data
            this.count = res.data.length
            this.isLoading = false
          })
          .catch(err => {
            this.isLoading = false
            console.log(err)
          })
      },
    },
  }
</script>

<style scoped>
.nav .absolute{
  position: absolute;
  top: 40px;
}

.absolute{
  margin-top: 20px;

}
</style>