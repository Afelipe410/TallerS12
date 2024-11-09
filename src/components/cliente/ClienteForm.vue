<template>
    <div class="cliente-form">
        <h3>{{ editMode ? 'Editar Cliente' : 'Nuevo Cliente' }}</h3>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Nombre:</label>
                <input v-model="form.nombre" type="text" required>
            </div>

            <div class="form-group">
                <label>Dirección:</label>
                <input v-model="form.direccion" type="text" required>
            </div>

            <div class="form-group">
                <label>Teléfono:</label>
                <input v-model="form.telefono" type="text" required>
            </div>

            <div class="form-group">
                <label>Ciudad:</label>
                <input v-model="form.ciudad" type="text" required>
            </div>

            <button type="submit">{{ editMode ? 'Actualizar' : 'Crear' }}</button>
            <button type="button" @click="resetForm">Cancelar</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useClienteStore } from '../../stores/cliente'

const emit = defineEmits(['cliente-added'])
const clienteStore = useClienteStore()

const initialForm = {
    nombre: '',
    direccion: '',
    telefono: '',
    ciudad: ''
}

const form = ref({ ...initialForm })
const editMode = ref(false)
const editingId = ref(null)

const handleSubmit = async () => {
    try {
        if (editMode.value) {
            await clienteStore.updateCliente(editingId.value, form.value)
        } else {
            await clienteStore.createCliente(form.value)
        }
        emit('cliente-added')
        resetForm()
    } catch (error) {
        console.error('Error:', error)
    }
}

const resetForm = () => {
    form.value = { ...initialForm }
    editMode.value = false
    editingId.value = null
}

const setEditingCliente = (cliente) => {
    form.value = { ...cliente }
    editMode.value = true
    editingId.value = cliente.id
}

defineExpose({ setEditingCliente })
</script>

<style scoped>
.cliente-form {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
}

button[type="button"] {
    background-color: #666;
}
</style>