// Importa la función 'create' de la biblioteca 'zustand'
import { create } from 'zustand'


// Crea un nuevo hook personalizado llamado 'useCart'
export const useProductModal = create((set) => ({
    selectedProduct: null,
    selectProduct: (product) => set({ selectedProduct: product })
}))