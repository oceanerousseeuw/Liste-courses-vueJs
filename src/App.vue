<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <Accueil />
        <Liste />
    </div>
</template>

<script>
    import Liste from './components/Liste.vue'
    //import Accueil from './components/Accueil.vue'

    export default {
        name: 'app',
        components: {
            //Accueil,
            Liste
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
