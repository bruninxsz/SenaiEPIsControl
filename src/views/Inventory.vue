<template>
    <header>
        <Header />
    </header>
    <div class="title">
        <h1>pagina Inventory</h1>
    </div>
    <div class="menu">
        <Menu />
    </div>
</template>

<script>
import Header from "../components/Header.vue"
import Menu from "../components/Menu.vue"
import Footer from "../components/Footer.vue"
export default {
    name: 'Homes',
    components: {
        Header,
        Menu,
        Footer
    }
}
</script>
