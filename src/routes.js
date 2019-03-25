import Vue from 'vue'
import Router from 'vue-router'
import Accueil from './components/Accueil.vue'
import Liste from './components/Liste.vue'
import Apropos from './components/Apropos.vue'
import MesListes from './components/MesListes.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Accueil
        },
        {
            path: '/a-propos',
            name: 'a-propos',
            component: Apropos
        },
        {
            path: '/mes-listes/:idList',
            component: Liste,
            name: 'mes-listes'
        },
        {
            path: '/mes-listes',
            component: MesListes
        }
    ]
})