<template>
  <v-menu :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            
            v-on="on"
        >
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      
        <layouts-search/>
    </v-menu>
</template>
<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>
<style scoped>
.absolute{
  position: absolute;
  top: 40px;
  z-index: 10000;
}
</style>