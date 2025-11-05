import { create } from 'zustand'

type State = {
    create: boolean
}

type Actions = {
    updateCount: () => void
}

export const useNotificationStore = create<State & Actions>((set) => ({
    create: false,
    updateCount: () =>
        set((state) => ({ create: !state.create })),
}))
