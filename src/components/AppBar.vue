<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Ventura RH {{usuario ? ` - ${usuario.usuario.role.toUpperCase()}S` : ''}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- <b-nav-item to="/" disabled>Aislan Almeida</b-nav-item> -->
        <b-nav-item v-if="!usuario" to="/login">Login</b-nav-item>
        <b-nav-item v-if="!usuario" to="/cadastro">Cadastre-se</b-nav-item>
        <b-nav-item v-if="usuario && usuario.usuario.role == 'empresa'" to="/adicionar-vaga">Cadastrar vaga</b-nav-item>
        <b-nav-item v-if="usuario" to="/buscar-vagas">Buscar Vagas</b-nav-item>
        <b-nav-item v-if="usuario && usuario.usuario.role == 'admin'" to="/buscar-usuarios">Buscar Usuários</b-nav-item>
        <b-nav-item v-if="usuario && usuario.usuario.role == 'candidato'" to="/buscar-vagas-respondidas">Ver Vagas Aplicadas</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="usuario">

        <v-btn class="mt-2" outlined small @click="alterarTema()" :dark="!this.$vuetify.theme.dark">{{`Tema ${this.$vuetify.theme.dark ? 'Claro' : 'Escuro'}`}}</v-btn>
        <b-nav-item disabled>{{usuario ? usuario.usuario.nome : ''}}</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Usuário</em>
          </template>
          <b-dropdown-item to="/perfil">Perfil</b-dropdown-item>
          <b-dropdown-item @click="logout()">Sair</b-dropdown-item>

        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  beforeMount(){
    let usuario = sessionStorage.getItem('usuario');
    if(usuario){
      this.usuario = JSON.parse(usuario);
      console.log(this.usuario);
    }  
  },
  data(){
    return{
      usuario:null
    }
  },
  methods:{
    logout(){
      sessionStorage.clear();
      this.$router.push('/');
      this.$router.go();
    },
    alterarTema(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
} 
</script>

<style>

</style>