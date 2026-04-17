import { create } from 'zustand';

export const useSaldoStore = create((set) => ({
    balance: 0,
    setBalance: (val) => set({ balance: val }),
    refreshSaldo: false,
    
    triggerRefresh: () =>
        set((state) => ({
            refreshSaldo: !state.refreshSaldo,
        })),
}));