<template>
  <div>
      <v-container>
          <v-row class="justify-content-center">
              <v-col cols="12" md="6">
                  <v-card>
                      <v-card-text class="text-center">
                          <v-avatar size="150" elevation="2">
                              <img  :src="'../avatar.png'" />
                          </v-avatar>
                          <v-divider></v-divider>
                          <v-form v-model="valido" @submit="efetuarLogin" ref="loginForm" lazy-validation>
                            <v-text-field dense outlined v-model="login.username" label="Email" type="email" :rules="rules" required></v-text-field>
                            <v-text-field dense outlined v-model="login.password" label="Senha" :type="mostrarSenha? 'text' : 'password'" :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'" @click:append="mostrarSenha = !mostrarSenha" :rules="rules" required></v-text-field>
                            <v-alert dense type="error" v-if="senhaIncorreta">Usuário ou senha incorretos</v-alert>
                            <v-btn small color="primary" type="submit" :loading="loading">Login</v-btn>
                          </v-form>
                      </v-card-text>
                  </v-card>
              </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
    data(){
        return{
            valido: false,
            mostrarSenha: false,
            loading:false,
            rules:[v => !!v || 'Campo obrigatório'],
            login:{
                username:'',
                password:'',
            },
            senhaIncorreta: false,
            usuario: null,

        }
    },
    methods:{
        efetuarLogin(event){
            this.loading = true;
            event.preventDefault();
            this.$refs.loginForm.validate()
            if(this.login.username && this.login.password){
                this.$axios.post('/login',this.login).then(resp =>{
                    this.usuario = resp.data;

                    sessionStorage.setItem('usuario',JSON.stringify(this.usuario));

                    this.loading = false;
                    this.$router.push('/');
                    this.$router.go();

                }).catch(err =>{
                    if(err.response.status == 401){
                        this.senhaIncorreta = true;
                    }else if(err.response.status == 403){
                        alert(err.response.data);
                    }
                    else{
                        console.log(err.response.status);
                        alert('Erro ao fazer login');
                    }

                    this.loading = false;
                })
            }
        }
    }

}
</script>

<style>

</style>