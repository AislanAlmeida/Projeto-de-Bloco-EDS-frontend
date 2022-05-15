<template>
      <div>
        <v-card>
            <v-card-text class="text-center">
                <h2>Cadastro</h2>
                <small>Já possui uma conta? <router-link to="/login">Faça login</router-link></small>
            </v-card-text>
        </v-card>
        <CadastroForm />
    </div>
</template>

<script>
import CadastroForm from '@/components/CadastroForm.vue'
export default {
    components:{
        CadastroForm,
    }
}
</script>

<style>

</style>