<template>
    <div id="accueil">
        <h1>Accueil</h1>
        <div>
            <p>Voici votre dernière liste modifiée :</p>
            <router-link :to="{ name: 'mes-listes', params: { idList: myLastList.idOfList } }">{{myLastList.name}}</router-link>
        </div>
    </div>
</template>

<script>
import Nav from './Nav.vue'

export default {
    name: 'accueil',
    components: {
        Nav
    },
    data(){
        return {
            myLastList : ""
        }
    },
    created: function () {
        var lastListId = window.localStorage.getItem('lastListId') || null;
        var lists = JSON.parse(window.localStorage.getItem('listOfList')) || [];
        if(lastListId) {
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].idOfList == lastListId) {
                    this.myLastList = lists[i];
                }
            }
        }
    },
}
</script>