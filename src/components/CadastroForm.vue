<template>
<div>
      <v-container>
          <v-row class="justify-content-center">
              <v-col cols="12" md="6">
                  <v-card>
                      <v-card-text class="text-center">
                          <v-form ref="cadastroForm" v-model="valido" @submit="submitForm" lazy-validation>

                            <v-text-field dense outlined v-model="cadastro.nome" label="Nome" type="text" :rules="[regras.obrigatorio]" hint="Nome completo" required></v-text-field>
                            <v-text-field dense outlined v-model="cadastro.email" label="E-mail" type="email" :rules="[regras.obrigatorio, regras.email]" hint="email@exemplo.com" required></v-text-field>
                            <v-text-field dense outlined v-model="cadastro.telefone" label="Telefone" type="phone" :rules="[regras.obrigatorio]" hint="Apenas números" required></v-text-field>
                            <v-text-field dense outlined v-model="cadastro.endereco" label="Endereco" type="phone" required></v-text-field>
                            <v-text-field dense outlined v-model="cadastro.cidade" label="Cidade" type="text" :rules="[regras.obrigatorio]" required></v-text-field>
                            <v-select dense outlined :items="['RJ','ES','SP','MG','PR','SC','RS']" label="Estado" v-model="cadastro.UF" :rules="[regras.obrigatorio]" required></v-select>
                            <v-divider></v-divider>
                            <v-row dense>
                                <v-col cols="12" md="6">
                                    <v-radio-group v-model="cadastro.tipo" label="Qual o tipo de cadastro?">
                                        <v-radio label="CPF" value="candidato"></v-radio>
                                        <v-radio label="CNPJ" value="empresa"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" md="6" v-if="cadastro.tipo == 'candidato'">
                                    <p>Dados de Candidato</p>
                                    <v-text-field outlined dense type="number" v-model="cadastro.CPF" label="CPF" hint="Apenas números"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" v-if="cadastro.tipo == 'empresa'">
                                    <p>Dados de Empresa</p>
                                    <v-text-field outlined dense type="number" v-model="cadastro.CNPJ" label="CNPJ" hint="Apenas números"></v-text-field>
                                    <v-text-field outlined dense type="text" v-model="cadastro.razaoSocial" label="Razão Social" hint="Razão social da empresa"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-divider></v-divider>
                            <v-text-field dense outlined 
                                v-model="cadastro.senha" 
                                label="Senha" 
                                :rules="[regras.senhasIguais, regras.obrigatorio]"
                                :type="mostrarSenha ? 'text':'password'" 
                                :append-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'" 
                                @click:append="mostrarSenha = !mostrarSenha" required></v-text-field>
                            <v-text-field dense outlined 
                                v-model="cadastro.confirmacao" 
                                label="Confirmação Senha" 
                                :rules="[regras.senhasIguais, regras.obrigatorio]"
                                :type="mostrarConfirmacao ? 'text' : 'password'" 
                                :append-icon="mostrarConfirmacao ? 'mdi-eye-off' : 'mdi-eye'" 
                                @click:append="mostrarConfirmacao = !mostrarConfirmacao" required></v-text-field>

                            <v-btn small color="primary" type="submit">Registrar</v-btn>
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
            cadastro:{
                nome: '',
                email: '',
                telefone: '',
                cidade: '',
                UF: '',
                tipo: '',
                senha: '',
                CPF: '',
                CNPJ: '',
                razaoSocial: '',
                confirmacaoSenha: '',
            },
            valido:false,
            mostrarSenha: false,
            mostrarConfirmacao: false,
            regras:{
                obrigatorio: value => !!value || 'Campo Obrigatório',
                senhasIguais: () =>  this.cadastro.senha == this.cadastro.confirmacao || 'Senhas não conferem',
                email: value =>{
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'E-mail inválido.'
                }
            }
        }
    },
    methods:{
        submitForm(e){
            e.preventDefault();
            if(this.$refs.cadastroForm.validate()){
                this.$axios.post('/usuarios',this.cadastro).then(resp =>{
                    
                    console.log(resp.data);
                    
                    alert('Cadastro criado com sucesso!');
                    
                    this.$router.push('/login');
                }).catch(err => {
                    console.log(err.response.data.mensagem);
                    alert(`Erro ao criar cadastro: ${err.response.data.mensagem}`);
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