<template>
  <v-card>
      <v-card-text>
          <v-card-title>Editando Perfil - {{usuario.usuario.id}}</v-card-title>
          <v-row class="justify-content-center">
              <v-col cols="12" md="10">
                  <v-card>
                      <v-card-text class="text-center">
                          <v-form ref="perfilForm" v-model="valido" @submit="submitForm" lazy-validation>

                            <v-text-field dense outlined v-model="usuario.usuario.nome" label="Nome *" type="text" :rules="[regras.obrigatorio]" hint="Nome completo" required></v-text-field>
                            <v-text-field dense outlined v-model="usuario.usuario.email" label="E-mail *" type="email" :rules="[regras.obrigatorio, regras.email]" hint="email@exemplo.com" required disabled></v-text-field>
                            <v-text-field dense outlined v-model="usuario.usuario.telefone" label="Telefone *" type="phone" :rules="[regras.obrigatorio]" hint="Apenas números" required></v-text-field>
                            <v-text-field dense outlined v-model="usuario.usuario.endereco" label="Endereco *" type="phone" required></v-text-field>
                            <v-text-field dense outlined v-model="usuario.usuario.cidade" label="Cidade *" type="text" :rules="[regras.obrigatorio]" required></v-text-field>
                            <v-text-field dense outlined v-model="usuario.usuario.linkedin" label="Linkedin" type="text" ></v-text-field>
                            <v-text-field dense outlined v-model="usuario.usuario.instagram" label="Instagram" type="text"></v-text-field>
                            <v-select dense outlined :items="['RJ','ES','SP','MG','PR','SC','RS']" label="Estado *" v-model="usuario.usuario.UF" :rules="[regras.obrigatorio]" required></v-select>
                            <v-divider></v-divider>
                            <v-row dense>
                                <v-col cols="12" v-if="usuario.usuario.role == 'candidato'">
                                    <p>Dados de Candidato</p>
                                    <v-text-field outlined dense type="number" v-model="usuario.usuario.CPF" label="CPF" hint="Apenas números"></v-text-field>
                                </v-col>
                                <v-col cols="12" v-if="usuario.usuario.role == 'empresa'">
                                    <p>Dados de Empresa</p>
                                    <v-text-field outlined dense type="number" v-model="usuario.usuario.CNPJ" label="CNPJ" hint="Apenas números" disabled></v-text-field>
                                    <v-text-field outlined dense type="text" v-model="usuario.usuario.razaoSocial" label="Razão Social" hint="Razão social da empresa"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-btn small color="primary" type="submit">Alterar</v-btn>
                        </v-form>
                      </v-card-text>
                  </v-card>
              </v-col>
          </v-row>

      </v-card-text>
  </v-card>
</template>

<script>
export default {
    beforeMount(){
        let usuario = sessionStorage.getItem('usuario');
        if(usuario){
            this.usuario = JSON.parse(usuario);
        }  
    },
    mounted(){
        this.obterPerfil();
    },
    data(){
        return{
            usuario:null,
            valido:false,
            regras:{
                obrigatorio: value => !!value || 'Campo Obrigatório',
                senhasIguais: () =>  this.usuario.usuario.senha == this.usuario.usuario.confirmacao || 'Senhas não conferem',
                email: value =>{
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'E-mail inválido.'
                }
            }
        }
    },
    methods:{
        obterPerfil(){
            console.log(`Obtendo perfil ${this.usuario.usuario.id}`)
            this.$axios.get(`/usuarios/${this.usuario.usuario.id}`,{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
            .then(resp =>{
                this.usuario.usuario = resp.data;
                console.table(this.usuario.usuario);
            }).catch(err =>{
                console.log(err);
            });
        },
        submitForm(e){
            e.preventDefault();
            if(this.$refs.perfilForm.validate()){
                this.$axios.put('/usuarios',this.usuario.usuario,{headers:{'Authorization':`Bearer ${this.usuario.token}`}}).then(resp =>{
                    
                    console.log(resp.data);
                    alert('Perfil alterado com sucesso!');
                    
                    this.$router.push('/');
                }).catch(err => {
                    console.log(err.response.data.mensagem);
                    alert(`Erro ao criar usuario.usuario: ${err.response.data.mensagem}`);
                })
            }else{
                alert('Preencha os campos obrigatórios');
            }
        }
    }
}
</script>

<style>

</style>