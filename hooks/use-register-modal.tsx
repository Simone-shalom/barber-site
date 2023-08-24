import {create} from 'zustand'

interface useRegisterModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useRegisterModal = create<useRegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))