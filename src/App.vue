<template>
  <v-app>
    <AppBar />
    <router-view />
    <FooterComponent />
  </v-app>
</template>

<script>

import AppBar from './components/AppBar.vue'
import FooterComponent from './components/FooterComponent.vue'
export default {
  name: 'App',

  components: {
    AppBar,
    FooterComponent,
  },

};
</script>
