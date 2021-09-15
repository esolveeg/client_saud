<template>
    <v-overlay :value="true">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>


<style>
.v-overlay__scrim{
  background-color: #fff !important;
}
</style>