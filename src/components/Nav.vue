<template>
    <div>
        <div id="navbar">
            <router-link to="/">Accueil</router-link>
            <router-link to="/liste">ma liste</router-link>
            <router-link to="/a-propos">À propos</router-link>
        </div>
        <router-view ></router-view>
    </div>
</template>

<script>
    export default {
        name: 'navbar'
    }
</script>

<style>
    #navbar {
        background-color: black;
    }

    #navbar a {
        color: white;
        display: inline-block;
        margin: 20px;
        text-decoration: none;
    }

    #navbar a:hover {
        text-decoration: underline;
    }
</style>