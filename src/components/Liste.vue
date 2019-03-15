<template>

    <div id="liste">
        <Nav/>
        <h1>Ma liste de course</h1>

        <input v-model="element" @keyup.enter="addOnList(element)" placeholder="produit...">
        <button @click="addOnList(element)">Ajouter à la liste</button>
        <div v-if="element">
            <ul>
                <li v-for="possibility in getFilteredPossibilities" @click="addOnList(possibility)">{{possibility}}</li>
            </ul>
        </div>
        <ul>
            <li v-for="(item, id) in list" :elem="item" :key="id">
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
        data() {
            return {
                element: '',
                list: [],
                budget: 0,
                possibilities: ["tomate", "oignons", "pâtes", "aubergine", "boeuf", "pomme de terre", "lait", "beurre", "sauce", "ketchup", "piment", "pain", "pomme"]
            }
        },
        computed: {
            getTotal: function () {
                let total = 0;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].good) {
                        total += Number(this.list[i].price);
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
        mounted: function () {
            if (localStorage.getItem('list')) {
                try {
                    this.list = JSON.parse(localStorage.getItem('list'));
                } catch (e) {
                    localStorage.removeItem('list');
                }
            }
        },
        methods: {
            addOnList: function (item) {
                this.list.push({text: item, price: "", good: false});
                this.addOnLocalStorage();
                this.element = "";
            },
            addOnBag: function (item) {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].text === item.text) {
                        this.list[i].good = true;
                    }
                }
                this.addOnLocalStorage();
            },
            deleteFromList: function (id) {
                this.list.splice(id, 1);
                this.addOnLocalStorage();
            },
            addOnLocalStorage() {
                const parsed = JSON.stringify(this.list);
                localStorage.setItem('list', parsed);
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