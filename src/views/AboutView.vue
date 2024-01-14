<template>
    <div class="about">
        <h1>WebTech Projekt WS23/24 by:</h1>
        <h4>Patrick Scheibe und Moritz Köth</h4>
        <p></p>
        <h3>Bildquellen:</h3>
        <div class="image-source">
            <p>1. <a href="https://de.botlibre.biz/media/a532564-0.png" target="_blank">Quelle 1</a></p>
            <p>2. <a href="https://s1.1zoom.me/b5050/957/Vegetables_Fish_Food_560056_1920x1080.jpg" target="_blank">Quelle 2</a></p>
        </div>
    </div>
</template>

<style>
.about {
    color: white;
    padding: 20px;
}

.image-source {
    margin-top: 10px;
}

@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: left;
    }
}
</style>