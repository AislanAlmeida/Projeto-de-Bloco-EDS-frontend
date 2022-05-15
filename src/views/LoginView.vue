<template>
    <div>
        <v-card>
            <v-card-text class="text-center">
                <h2>Login</h2>
                <small>Não possui uma conta? <router-link to="/cadastro">Cadastre-se</router-link></small>
            </v-card-text>
        </v-card>
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
    components:{
        LoginForm
    }
}
</script>

<style>

</style>