<template>
    <div class="clientes">
        <h2>Gestión de Clientes</h2>
        <ClienteForm @cliente-added="handleClienteAdded" />
        <ClienteList />
    </div>
</template>

<script setup>
import ClienteForm from '../components/cliente/ClienteForm.vue'
import ClienteList from '../components/cliente/ClienteList.vue'
import { useClienteStore } from '../stores/cliente'

const clienteStore = useClienteStore()

const handleClienteAdded = () => {
    clienteStore.fetchClientes()
}
</script>
