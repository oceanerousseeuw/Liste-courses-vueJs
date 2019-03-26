<template>

    <div id="liste">
        <h1>Ma liste de course : {{myList.name}}</h1>

        <input v-model="element" @keyup.enter="addOnList(element)" placeholder="produit...">
        <button @click="addOnList(element)">Ajouter à la liste</button>
        <div v-if="element">
            <ul>
                <li v-for="possibility in getFilteredPossibilities" @click="addOnList(possibility)">{{possibility}}</li>
            </ul>
        </div>
        <ul>
            <li v-for="(item, id) in myList.content" :elem="item" :key="id" >
                <button id="good" @click="addOnBag(item)">Ok</button>
                <p :class="{good : item.good}">{{item.text}}
                    <input v-if="item.good" v-model="item.price" class="price" placeholder="prix">
                </p>
                <button id="delete" @click="deleteFromList(id)">X</button>
            </li>
        </ul>
        <div id="budget-total">
            <div id="recap">
                <p><span>Budget : </span><input v-model="budget"/></p>
                <p><span>Total : </span><span id="total">{{getTotal}}</span></p>
            </div>
            <p>{{getBudgetMessage}}</p>
        </div>
    </div>

</template>

<script>
    import Nav from './Nav.vue'

    export default {
        name: 'liste',
        components: {
            Nav
        },
        props: {
            idList: {
                type: String,
                default: '0'
            },
        },
        data() {
            return {
                myList: "",
                element: '',
                budget: 0,
                possibilities: ["tomate", "oignons", "pâtes", "aubergine", "boeuf", "pomme de terre", "lait", "beurre", "sauce", "ketchup", "piment", "pain", "pomme"]
            }
        },
        created: function () {
            var lists = JSON.parse(window.localStorage.getItem('listOfList')) || [];
            for(var i= 0; i<lists.length; i++){
                if (lists[i].idOfList == this.$route.params.idList){
                    this.myList = lists[i];
                }
            }
        },
        computed: {
            getTotal: function () {
                let total = 0;
                if(this.myList.content) {
                    for (var i = 0; i < this.myList.content.length; i++) {
                        if (this.myList.content[i].good) {
                            total += Number(this.myList.content[i].price);
                        }
                    }
                }
                return total;
            },

            getBudgetMessage: function () {
                let total = this.getTotal;
                if (this.budget < total) {
                    return "Tu dépasses le budget";
                } else {
                    return "";
                }
            },
            getFilteredPossibilities: function () {
                return this.possibilities.filter(possibility => possibility.includes(this.element));
            }
        },
        methods: {
            addOnList: function (item) {
                this.myList.content.push({text: item, price: "", good: false});
                this.addOnLocalStorage();
                this.element = "";
            },
            addOnBag: function (item) {
                for (let i = 0; i < this.myList.content.length; i++) {
                    if (this.myList.content[i].text === item.text) {
                        this.myList.content[i].good = true;
                    }
                }
                this.addOnLocalStorage();
            },
            deleteFromList: function (id) {
                this.myList.content.splice(id, 1);
                this.addOnLocalStorage();
            },
            addOnLocalStorage() {
                var lists = JSON.parse((window.localStorage.getItem('listOfList'))) || [];
                for (var i=0; i<lists.length; i++){
                    if(lists[i].idOfList == this.myList.idOfList){
                        lists[i] = this.myList;
                    }
                }
                const parsed = JSON.stringify(lists);
                localStorage.setItem('listOfList', parsed);
                window.localStorage.setItem('lastListId', JSON.stringify(this.myList.idOfList));
            }
        }

    }


</script>


<style>
    ul, li {
        list-style-type: none;
    }

    li {
        width: 300px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    li p {
        margin: 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
    }

    .price {
        width: 40px;
    }

    #good {
        background-color: green;
    }

    #delete {
        background-color: red;
    }

    #good, #delete {
        border: none;
        color: white;
        padding: 5px;
        width: 45px;
    }

    .good {
        color: green;
        font-weight: bold;
    }

    #recap {
        display: flex;
        justify-content: space-between;
    }

    #recap input {
        width: 70px;
    }

    #budget-total {
        width: 300px;
    }
</style>