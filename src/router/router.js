import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const routes = [
  {
    path: '/',
    name: 'home', // O nome da rota pode ser qualquer coisa, mas "home" é comum
    component: App // Apontando para o App.vue diretamente
  },
  // Outras rotas que você estiver usando
]

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL), // Correção aqui
  routes
})

export default router



