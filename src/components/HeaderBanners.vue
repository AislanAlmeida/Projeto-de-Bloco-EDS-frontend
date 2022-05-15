<template>
  <v-carousel :cycle="true" height="300"> 
      <v-carousel-item v-for="(banner,i) in banners" :key="i" >
          <v-img :src="`../${banner}`" style="height:100%;"></v-img>
      </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
    data(){
        return{
            banners:[
                'banner1.jpg',
                'banner2.jpg',
                'banner3.jpg',
            ]
        }
    }
}
</script>

<style>

</style>