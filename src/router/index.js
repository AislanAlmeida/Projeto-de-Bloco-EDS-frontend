import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue')
  },
  {
    path: '/adicionar-vaga',
    name: 'adicionarVaga',
    component: () => import('../views/CadastroVaga.vue')
  },
  {
    path: '/buscar-vagas',
    name: 'buscarVaga',
    component: () => import('../views/BuscarVagas.vue')
  },
  {
    path: '/buscar-usuarios',
    name: 'buscarUsuarios',
    component: () => import('../views/UsuariosView.vue')
  },
  {
    path: '/buscar-vagas-respondidas',
    name: 'buscarVagasRespondidas',
    component: () => import('../views/BuscarVagasRespondidas.vue')
  },
  {
    path: '/perfil',
    name: 'editarPerfil',
    component: () => import('../views/PerfilView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  let usuario = sessionStorage.getItem('usuario');
  if(!usuario){
    if(to.name != 'login' && to.name != 'home' && to.name != 'cadastro'){
      next({
        path: '/login',
        replace:true
      })
    }else{
      next();
    }
  }else{
    next();
  }

})

export default router
