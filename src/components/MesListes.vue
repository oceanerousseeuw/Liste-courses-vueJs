<template>
    <div>
        <h1>Mes Listes</h1>

        <input v-model="listes" placeholder="Rechercher...">
        <ul>
            <li v-for="(item,id) in listOfList" :elem="item" :key="id">
                <router-link :to="{ name: 'mes-listes', params: { idList: item.idOfList } }">{{item.name}}</router-link>
            </li>
        </ul>
        <input v-model="newList" @keyup.enter="createList(newList)" placeholder="nouvelle liste...">
        <button @click="createList(newList)">Créer la liste</button>

    </div>
</template>


<script>
    import Nav from './Nav.vue'

    export default {
        name: 'mes-listes',
        components: {
            Nav
        },
        props :{
            content : {
                type : Array,
                default : function(){return [{ text: "texte", price: 0, good: false}]}
            }
        },
        data() {
            return {
                newList: '',
                listes: '',
                listOfList: [],
                idCreator : 0
            }
        },
        created: function(){
            if (localStorage.getItem('idCreator')) {
                this.idCreator = localStorage.getItem('idCreator');
            }
        },
        mounted: function () {
            if (localStorage.getItem('listOfList')) {
                try {
                    this.listOfList = JSON.parse(localStorage.getItem('listOfList'));
                } catch (e) {
                    localStorage.removeItem('listOfList');
                }
            }
        },
        computed: {
           /* getSearchLists: function () {
                return this.listOfList.filter(possibility => possibility.includes(this.listes));
            }*/
        },
        methods: {
            createList(newList) {
                this.idCreator = parseInt(this.idCreator) + 1;
                this.listOfList.push({name : newList, idOfList: this.idCreator, content : []});
                this.addOnLocalStorage();
                this.newList = "";
            },
            addOnLocalStorage() {
                const parsed = JSON.stringify(this.listOfList);
                localStorage.setItem('listOfList', parsed);
                localStorage.setItem('idCreator', this.idCreator);
            }
        }

    }
</script>