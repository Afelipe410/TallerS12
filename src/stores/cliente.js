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
                this.clientes = response.data
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        async createCliente(cliente) {
            try {
                const response = await axios.post(`${API_URL}/cliente`, cliente)
                this.clientes.push(response.data)
                return response.data
            } catch (error) {
                this.error = error.message
                throw error
            }
        },

        async updateCliente(id, cliente) {
            try {
                const response = await axios.patch(`${API_URL}/cliente/${id}`, cliente)
                const index = this.clientes.findIndex(c => c.id === id)
                if (index !== -1) {
                    this.clientes[index] = response.data
                }
                return response.data
            } catch (error) {
                this.error = error.message
                throw error
            }
        },

        async deleteCliente(id) {
            try {
                await axios.delete(`${API_URL}/cliente/${id}`)
                this.clientes = this.clientes.filter(c => c.id !== id)
            } catch (error) {
                this.error = error.message
                throw error
            }
        }
    }
})