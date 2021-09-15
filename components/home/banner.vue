<template>
<div class="pointer" @click.prevent="$router.push({name : `shop___${$i18n.locale}` , query : {}})">
    <v-skeleton-loader
      width="100%"
      height="150px"
      type="image"
      v-if="loading"
    >
    </v-skeleton-loader>
    <v-img :src="img" v-else></v-img>
</div>
</template>
<script>
export default {
  props:['img' , 'loading']
}
</script>