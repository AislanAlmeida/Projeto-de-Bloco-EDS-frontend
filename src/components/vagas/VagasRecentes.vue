<template>
    <v-container>
        <v-card  :loading="loading" >
            <v-card-text>
                <v-card-title>Úlltimas Vagas Postadas</v-card-title>
                <v-divider></v-divider>
                <v-data-table dense :headers="[
                        {text:'Data Postagem',value:'createdAt'},
                        {text:'Cargo',value:'cargo'},
                        {text:'Cidade',value:'cidade'},
                        {text:'UF',value:'UF'},
                    ]" :items="vagas">
                    </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            loading: false,
            vagas:[],
        }
    },
    mounted(){
        this.obterVagasRecentes();
    },
    methods:{
        obterVagasRecentes(){
            this.loading = true;

            this.$axios.get('/vagas/recentes')
            .then(resp => {
                this.vagas = resp.data;
                this.vagas.map(v => {
                    v.createdAt = new Date(v.createdAt).toLocaleDateString('pt-br')
                })
                this.loading = false;
            }).catch(err =>{
                alert('não foi possível obter as vagas recentes')
                console.log(err);
                this.loading = false;
            })
        }
    }
}
</script>

<style>

</style>