<template>
    <div>
        <h1>Mes Listes</h1>

        <div class="createList">
            <h2>Créer une nouvelle liste</h2>
            <input v-model="newList" @keyup.enter="createList(newList)" placeholder="nouvelle liste...">
            <button @click="createList(newList)">Créer la liste</button>
        </div>
        <div class="searchResults">
            <h2>Rechercher</h2>
            <input v-model="listes" placeholder="Rechercher...">
            <div v-if="listes">
                <ul>
                    <li v-for="possibility in getSearchLists">
                        <router-link :to="{ name: 'mes-listes', params: { idList: possibility.idOfList } }">
                            {{possibility.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="listOfList">
            <h2>Liste des listes existantes</h2>
            <ul>
                <li v-for="(item,id) in listOfList" :elem="item" :key="id">
                    <router-link :to="{ name: 'mes-listes', params: { idList: item.idOfList } }">{{item.name}}
                    </router-link>
                    <button id="delete" @click="deleteFromList(id)">X</button>
                </li>
            </ul>
        </div>

    </div>
</template>


<script>
    import Nav from './Nav.vue'

    export default {
        name: 'mes-listes',
        components: {
            Nav
        },
        props: {
            content: {
                type: Array,
                default: function () {
                    return [{text: "texte", price: 0, good: false}]
                }
            }
        },
        data() {
            return {
                newList: '',
                listes: '',
                listOfList: [],
                idCreator: 0
            }
        },
        created: function () {
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
            getSearchLists: function () {
                return this.listOfList.filter(possibility => possibility.name.includes(this.listes));
            }
        },
        methods: {
            createList(newList) {
                this.idCreator = parseInt(this.idCreator) + 1;
                this.listOfList.push({name: newList, idOfList: this.idCreator, content: []});
                this.addOnLocalStorage();
                this.newList = "";
            },
            deleteFromList: function (id) {
                this.listOfList.splice(id, 1);
                this.addOnLocalStorage();
            },
            addOnLocalStorage() {
                const parsed = JSON.stringify(this.listOfList);
                localStorage.setItem('listOfList', parsed);
                localStorage.setItem('idCreator', this.idCreator);
            }
        }

    }
</script>


<style>
    .searchResults {
        background-color: #eeeeee;
    }

    .createList, .searchResults, .listOfList{
        padding: 20px;
    }

    h2{
        margin: 0;
    }
</style>