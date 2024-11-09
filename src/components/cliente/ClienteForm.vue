<template>
    <div class="cliente-form card">
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

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    {{ editMode ? 'Actualizar' : 'Crear' }}
                </button>
                <button type="button" class="btn btn-secondary" @click="resetForm">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
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
        let success
        if (editMode.value) {
            success = await clienteStore.updateCliente(editingId.value, form.value)
        } else {
            success = await clienteStore.createCliente(form.value)
        }
        
        if (success) {
            emit('cliente-added')
            resetForm()
            alert(editMode.value ? 'Cliente actualizado exitosamente' : 'Cliente creado exitosamente')
        } else {
            alert('Error al procesar la operación')
        }
    } catch (error) {
        console.error('Error:', error)
        alert('Error al procesar la solicitud')
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
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--secondary-color);
    font-weight: var(--font-weight-medium);
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: var(--font-weight-medium);
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>