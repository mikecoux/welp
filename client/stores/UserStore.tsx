import { create } from 'zustand'

interface UserState {
    user: { username:string, password_hash:string } | null
    setUser: ( obj: { username:string, password_hash:string } | null ) => void
}

export const useUserStore = create<UserState>()((set) => ({
    user: null,
    setUser: (obj) => set(() => ({user: obj})),
}))