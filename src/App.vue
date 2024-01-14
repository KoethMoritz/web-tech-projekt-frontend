<template>
    <div>
        <header>
            <div class="wrapper">
                <p class="invisible-text">PLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTERPLATZHALTER</p>
                <p class="invisible-text">PLATZHALTERPLATZHALTERPLATZH</p><HelloWorld msg="Deine eigene digitale Kochbox"/>

                <nav>
                    <router-link to="/">
                        <img src="@/assets/Home.png" alt="Home" style="width: 250px; height: 50px;" />
                    </router-link>
                    <router-link to="/about">
                        <img src="@/assets/About.png" alt="About" style="width: 250px; height: 50px;" />
                    </router-link>
                    <router-link to="/recipe-form">
                        <img src="@/assets/Add%20Recipe.png" alt="Add Recipe" style="width: 250px; height: 50px;" />
                    </router-link>
                    <router-link to="/recipes">
                        <img src="@/assets/Recipe%20List.png" alt="Recipe List" style="width: 250px; height: 50px;" />
                    </router-link>
                </nav>
            </div>
        </header>

        <main>
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.invisible-text {
    visibility: hidden;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
