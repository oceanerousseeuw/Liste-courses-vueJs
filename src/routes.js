import Vue from 'vue'
import Router from 'vue-router'
import Accueil from './components/Accueil.vue'
import Liste from './components/Liste.vue'
import Apropos from './components/Apropos.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Accueil
        },
        {
            path: '/liste',
            name: 'liste',
            component: Liste
        },
        {
            path: '/a-propos',
            name: 'a-propos',
            component: Apropos
        }
    ]
})