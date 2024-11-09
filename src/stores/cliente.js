import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:7070'

export const useClienteStore = defineStore('cliente', {
    state: () => ({
        clientes: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchClientes() {
            this.loading = true
            try {
                const response = await axios.get(`${API_URL}/cliente`)
                this.clientes = response.data.data
                this.error = null
            } catch (error) {
                this.error = 'Error al cargar los clientes'
                console.error('Error:', error)
            } finally {
                this.loading = false
            }
        },

        async deleteCliente(id) {
            this.loading = true
            try {
                const response = await axios.delete(`${API_URL}/cliente/${id}`)
                if (response.data.message === 'ok') {
                    await this.fetchClientes()
                    return true
                }
                return false
            } catch (error) {
                this.error = 'Error al eliminar el cliente'
                console.error('Error:', error)
                return false
            } finally {
                this.loading = false
            }
        },

        async updateCliente(id, clienteData) {
            this.loading = true
            try {
                const response = await axios.patch(`${API_URL}/cliente/${id}`, clienteData)
                if (response.data.message === 'ok') {
                    await this.fetchClientes()
                    return true
                }
                return false
            } catch (error) {
                this.error = 'Error al actualizar el cliente'
                console.error('Error:', error)
                return false
            } finally {
                this.loading = false
            }
        },

        async getClienteById(id) {
            this.loading = true
            try {
                const response = await axios.get(`${API_URL}/cliente/id/${id}`)
                if (response.data.message === 'ok') {
                    return response.data.data
                }
                return null
            } catch (error) {
                this.error = 'Error al obtener el cliente'
                console.error('Error:', error)
                return null
            } finally {
                this.loading = false
            }
        }
    }
})