<template>
  <v-container>

    <v-card>
        <v-card-text>
            <v-card-title>{{mensagem}}</v-card-title>
            <v-divider></v-divider>
            <!-- <v-img :src="'../skeleton.png'"></v-img> -->
            <h3>{{valor}}</h3>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props:{
    mensagem:String,
    valor:String
  }
}
</script>

<style>

</style>