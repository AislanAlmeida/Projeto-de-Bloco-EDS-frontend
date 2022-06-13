<template>
  <v-card>
      <v-card-text>
        <h2 class="text-center">Adicionando uma competencia</h2>
        <hr>
          {{role}}
        <v-text-field dense outlined type="text" v-model="competencia.nome" label="Nome da Competência" :rules="rules"></v-text-field>
        <v-text-field dense outlined type="text" v-model="competencia.descricao" label="Descrição da Competência" :rules="rules"></v-text-field>
        <v-select dense outlined :items="perfis" v-model="competencia.perfil" label="Perfil Desejado" :rules="rules"></v-select>
        <v-select dense outlined :items="pesos" v-model="competencia.peso" label="Peso" required :rules="rules"></v-select>
        <v-btn color="primary" @click="salvarCompetencia()">Salvar</v-btn>
      </v-card-text>
  </v-card>
</template>

<script>
class competencia{
    constructor(nome='',descricao='',perfil=5,peso=5){
        this.nome = nome,
        this.descricao = descricao,
        this.perfil = perfil,
        this.peso = peso
    }
}
export default {
    props:{
        role: String,
    },
    data(){
        return{
            perfis:[
                {text:'Excelente',value:5,color:'teal'},
                {text:'Muito Bom',value:4,color:'cyan'},
                {text:'Bom',value:3,color:'lime'},
                {text:'Pouco',value:2,color:'deep-orange'},
                {text:'Nenhum/Muito Pouco',value:1,color:'red'},
            ],
            pesos:[
                {text:'Obrigatório (Peso 5)',value:5},
                {text:'Indispensável (Peso 4)',value:4},
                {text:'Muito Importante (Peso 3)',value:3},
                {text:'Importante (Peso 2)',value:2},
                {text:'Desejavel (Peso 1)',value:1}
                
            ],
            competencia:new competencia(),
            rules: [value => !!value || 'Campo obrigatório.'],
        }
    },
    methods:{
        salvarCompetencia(){
            if(this.competencia.descricao && this.competencia.perfil && this.competencia.peso > 0){
                this.$emit('adicionarCompetencia',new competencia(this.competencia.nome,this.competencia.descricao,this.competencia.perfil,this.competencia.peso));
                this.competencia = new competencia();
            }else{
                alert('É necessário as propriedades da competencia')
            }
        }
    }
}
</script>

<style>

</style>