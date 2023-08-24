import {create} from 'zustand'

interface useLoginModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useLoginModal = create<useLoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))