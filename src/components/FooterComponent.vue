<template>
  <v-card height="400px">
    <v-footer
      :absolute="true"
      :fixed="false"
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="blue darken-1 text-center"
      >
        <!-- <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text> -->

        <v-divider></v-divider>
        <div class="text-center">
          <v-img :src="'./infnet.png'" width="100" height="100" class="m-auto"></v-img>
        </div>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Aislan Almeida | Instituto Infnet | Engenharia Disciplinada de Software</strong>
        </v-card-text>
      </v-card>
    </v-footer>

  </v-card>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
     
    }),
   
  }
</script>