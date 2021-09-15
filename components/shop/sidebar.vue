<template>
  <div class="sidebar">
    <v-list>  
      <ul class="search" v-if="loading">
        <v-skeleton-loader
          class="mx-auto w-full"
          max-width="300"
          :loading="loading"
          type="list-item"
        ></v-skeleton-loader>
      </ul>
      <v-list-item v-else>
        <v-text-field
          v-model="searchModel"
          @input="searchFilter"
          rounded
          flat
          hide-details
          hide-no-data
          hide-selected
          :placeholder="$t('type_search')"
          prepend-icon="mdi-magnify"
          class="bg-black"
          return-object
          dense
          :label="$t('search')"
          clearable
        ></v-text-field>
      </v-list-item>
      <v-subheader>{{ $t("categories") }}</v-subheader>
      <ul class="categories" v-if="loading">
        <v-skeleton-loader
          v-for="i in 8"
          :key="i"
          class="mx-auto w-full"
          max-width="300"
          :loading="loading"
          type="list-item"
        ></v-skeleton-loader>
      </ul>
      <v-list-item
        v-else
        v-for="group in groups"
        :key="group.id"
        @click.prevent="filter(group)"
        link
      >
        <v-icon>mdi-{{ group.icon }}</v-icon>
        <v-list-item-title
          v-text="group.GroupName"
          v-if="$i18n.locale === 'ar'"
        ></v-list-item-title>
        <v-list-item-title
          v-text="group.GroupNameEn"
          v-else
        ></v-list-item-title>
      </v-list-item>

      <v-subheader>{{ $t("price") }}</v-subheader>
      <v-list-item>
        <v-row>
          <v-col cols="12">
            <div class="d-flex">
              <v-chip class="ma-2" color="primary">
                {{ $t("currency") }}
                <v-text-field
                  @change="setPrice"
                  v-model="priceModel[0]"
                  dark
                  class="price-filter"
                ></v-text-field>
                <!-- {{ $n(price[0], 'currency' , 'en') }}  -->
              </v-chip>
              <v-chip class="ma-2" color="primary">
                {{ $t("currency") }}
                <v-text-field
                  @change="setPrice"
                  v-model="priceModel[1]"
                  dark
                  class="price-filter"
                ></v-text-field>
                <!-- {{ $n(price[1], 'currency' , 'en') }} -->
              </v-chip>
            </div>
          </v-col>
          <v-col cols="12">
            <v-range-slider
              v-model="priceModel"
              @change="setPrice"
              dense
              max="500"
              min="0"
            ></v-range-slider>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
// import filters from '@/mixins/filters.js'
import { mapGetters } from "vuex";
// import addParamsToLocation from '@/utilities/helpers.js'
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters({
      groups: "group/groups",
      loading: "group/loading",
    }),
    priceModel: {
      get() {
        return this.$store.getters["shop/priceModel"];
      },
      set(payload) {
        this.$store.commit("shop/priceModel", payload);
      },
    },
    searchModel: {
      get() {
        return this.$store.getters["shop/searchModel"];
      },
      set(payload) {
        this.$store.commit("shop/searchModel", payload);
      },
    },
  },
  methods: {
    addParamsToLocation(params) {
      this.$store.dispatch("product/getProducts", params);
      history.pushState(
        {},
        null,
        this.$route.path +
          "?" +
          Object.keys(params)
            .map((key) => {
              return (
                encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
              );
            })
            .join("&")
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    searchFilter(q) {
      let query = this.$route.query;
      if (q != null && q.length > 0) {
        query.search = q;
        query.page = 1;
        setTimeout(() => {
          this.addParamsToLocation(query);
        }, 300);
      } else {
        query.search = "";
        query.page = 1;

        this.addParamsToLocation(query);
      }
    },
    filter(group) {
      const name =
        this.$i18n.locale == "ar" ? group.GroupName : group.GroupNameEn;
      const groupFilter = {
        id: group.id,
        name,
      };
      this.$store.commit("product/groupFilter", groupFilter);

      if (this.$route.name == `shop___${this.$i18n.locale}`) {
        let query = this.$route.query;
        query.group = group.id;
        query.page = 1;
        this.addParamsToLocation(query);
      } else {
        this.$router.push({
          name: `shop___${this.$i18n.locale}`,
          query: { group: group.id },
        });
      }
    },
    filterPriceFrom(price) {
      if (this.$route.name == `shop___${this.$i18n.locale}`) {
        let query = this.$route.query;
        query.priceFrom = price;
        query.page = 1;
      } else {
        this.$router.push({
          name: `shop___${this.$i18n.locale}`,
          query: { priceFrom: price },
        });
      }
    },
    filterPriceTo(price) {
      if (this.$route.name == `shop___${this.$i18n.locale}`) {
        let query = this.$route.query;
        query.priceTo = price;
        query.page = 1;
        this.addParamsToLocation(query);
      } else {
        this.$router.push({
          name: `shop___${this.$i18n.locale}`,
          query: { priceTo: price },
        });
      }
    },
    setPrice() {
      this.filterPriceFrom(this.priceModel[0]);
      this.filterPriceTo(this.priceModel[1]);
    },
  },
  created() {
    console.log(this.$route.query);
    let price = [0, 500];
    if (this.$route.query.priceFrom) {
      price[0] = this.$route.query.priceFrom;
    }
    if (this.$route.query.priceTo) {
      price[1] = this.$route.query.priceTo;
    }

    this.priceModel = price;
  },
};
</script>
<style>
.price-filter input {
  max-width: 50px !important;
  text-align: center;
}
.price-filter .v-text-field > .v-input__control > .v-input__slot::after {
  display: none !important;
}
</style>