import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:7070'

export const useMercanciaStore = defineStore('mercancia', {
    state: () => ({
        mercancias: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchMercancias() {
            this.loading = true
            try {
                const response = await axios.get(`${API_URL}/mercancia`)
                this.mercancias = response.data
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        async createMercancia(mercancia) {
            try {
                const response = await axios.post(`${API_URL}/mercancia`, mercancia)
                this.mercancias.push(response.data)
                return response.data
            } catch (error) {
                this.error = error.message
                throw error
            }
        },

        async updateMercancia(id, mercancia) {
            try {
                const response = await axios.patch(`${API_URL}/mercancia/${id}`, mercancia)
                const index = this.mercancias.findIndex(m => m.id === id)
                if (index !== -1) {
                    this.mercancias[index] = response.data
                }
                return response.data
            } catch (error) {
                this.error = error.message
                throw error
            }
        },

        async deleteMercancia(id) {
            try {
                await axios.delete(`${API_URL}/mercancia/${id}`)
                this.mercancias = this.mercancias.filter(m => m.id !== id)
            } catch (error) {
                this.error = error.message
                throw error
            }
        }
    }
})