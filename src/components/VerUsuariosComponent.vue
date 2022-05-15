<template>
    <div>
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="usuarios">
                    <template v-slot:[`item.alterar`]="{item}">
                        <!-- <v-btn v-if="item.status == 'ativo'" small outlined color="error" @click="bloquearUsuario(item.id)">Bloquear</v-btn> -->
                        <v-btn v-if="item.status == 'ativo'" small outlined color="error" @click="confirmaBloqueioUsuario(item)">Bloquear</v-btn>
                        <v-btn v-if="item.status == 'bloqueado'" small outlined color="success" @click="desbloquearUsuario(item.id)">Desbloquear</v-btn>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialogMotivoBloqueio" v-if="usuarioBloqueado != null">
            <v-card>
                <v-card-text>
                    <v-card-title>Digite o motivo da bloqueio - {{usuarioBloqueado.nome}}</v-card-title>
                    <v-text-field label="Motivo" type="text" v-model="motivoBloqueio"></v-text-field>
                    <v-btn color="primary" @click="bloquearUsuario(usuarioBloqueado.id)">Salvar</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

export default {
    mounted(){
        this.obterUsuarios();
    },
    beforeMount(){
        let usuario = sessionStorage.getItem('usuario');
        if(usuario){
            this.usuario = JSON.parse(usuario);
        }  
    },
    data(){
        return{
            usuarios:[],
            motivoBloqueio:'',
            usuarioBloqueado:null,
            dialogMotivoBloqueio:false,
            headers:[
                {text:'Id',value:'id'},
                {text:'Nome',value:'nome'},
                {text:'Tipo',value:'role'},
                {text:'Email',value:'email'},
                {text:'Status',value:'status'},
                {text:'Cidade',value:'cidade'},
                {text:'Estado',value:'UF'},
                {text:'Ação',value:'alterar'}
            ]
        }
    },
    methods:{
        obterUsuarios(){
            this.$axios.get('/usuarios',{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
            .then(resp =>{
                this.usuarios = resp.data;
            }).catch(err =>{
                console.log(err);
            })
        },
        confirmaBloqueioUsuario(usuario){
            this.usuarioBloqueado = usuario;
            this.dialogMotivoBloqueio = true;
        },
        bloquearUsuario(id){
            if(id){
                this.$axios.put(`/usuarios/bloquear/${id}`,{'motivoBloqueio':this.motivoBloqueio},{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
                .then(() =>{
                    alert('Usuario Bloqueado');
                    this.obterUsuarios();
                    this.usuarioBloqueado = null;
                    this.dialogMotivoBloqueio = false;
                }).catch(err => {
                    console.log(err);
                })
            }else{
                alert('Não é possível concluir esta operação');
            }
        },
        desbloquearUsuario(id){
            this.$axios.put(`/usuarios/desbloquear/${id}`,null,{headers:{'Authorization':`Bearer ${this.usuario.token}`}})
            .then(() =>{
                alert('Usuario Desbloqueado');
                this.obterUsuarios();
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>