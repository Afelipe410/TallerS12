<template>
    <div class="mercancias">
        <h2>Gestión de Mercancías</h2>
        <MercanciaForm @mercancia-added="handleMercanciaAdded" />
        <MercanciaList />
    </div>
</template>

<script setup>
import MercanciaForm from '../components/mercancia/MercanciaForm.vue'
import MercanciaList from '../components/mercancia/MercanciaList.vue'
import { useMercanciaStore } from '../stores/mercancia'

const mercanciaStore = useMercanciaStore()

const handleMercanciaAdded = () => {
    mercanciaStore.fetchMercancias()
}
</script>