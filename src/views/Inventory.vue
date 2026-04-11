<template>
<div class="bg-gray-100">
    
    <header>
        <Header />
    </header>

    <div class="flex">
        <Menu />
    </div>

    <div class="flex-1">
            
    
        <Footer/>
    </div>

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
