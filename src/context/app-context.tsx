'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import type { Member, Class, Booking } from '@/lib/types';

// --- DEFINIÇÃO DO ESTADO E AÇÕES ---
interface AppState {
  members: Member[];
  classes: Class[];
  bookings: Booking[];
  loading: boolean;
}

type Action =
  | { type: 'SET_DATA'; payload: { members: Member[]; classes: Class[]; bookings: Booking[] } }
  | { type: 'ADD_MEMBER'; payload: Member }
  | { type: 'DELETE_MEMBER'; payload: string } // payload is memberId
  | { type: 'ADD_CLASS'; payload: Class }
  | { type: 'DELETE_CLASS'; payload: string } // payload is classId
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'DELETE_BOOKING'; payload: string }; // payload is bookingId

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// --- LÓGICA DO REDUCER ---
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.payload, loading: false };
    case 'ADD_MEMBER':
      return { ...state, members: [action.payload, ...state.members] };
    case 'DELETE_MEMBER':
      return { ...state, members: state.members.filter((m) => m.id !== action.payload) };
    case 'ADD_CLASS':
      return { ...state, classes: [action.payload, ...state.classes] };
    case 'DELETE_CLASS':
      return { ...state, classes: state.classes.filter((c) => c.id !== action.payload) };
    case 'ADD_BOOKING':
      // Atualiza a contagem na aula correspondente
      const updatedClasses = state.classes.map(c => 
        c.id === action.payload.classId ? { ...c, _count: { bookings: c._count.bookings + 1 } } : c
      );
      return { ...state, bookings: [action.payload, ...state.bookings], classes: updatedClasses };
    case 'DELETE_BOOKING':
       const bookingToRemove = state.bookings.find(b => b.id === action.payload);
       if (!bookingToRemove) return state;
       
       const restoredClasses = state.classes.map(c => 
         c.id === bookingToRemove.classId ? { ...c, _count: { bookings: c._count.bookings - 1 } } : c
       );
      return { ...state, bookings: state.bookings.filter((b) => b.id !== action.payload), classes: restoredClasses };
    default:
      return state;
  }
}

// --- VALORES INICIAIS ---
const initialState: AppState = {
  members: [],
  classes: [],
  bookings: [],
  loading: true,
};

// --- COMPONENTE PROVEDOR ---
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    async function loadData() {
      try {
        const [membersRes, classesRes, bookingsRes] = await Promise.all([
          fetch('/api/members'),
          fetch('/api/classes'),
          fetch('/api/bookings'),
        ]);
        const [members, classes, bookings] = await Promise.all([
            membersRes.json(),
            classesRes.json(),
            bookingsRes.json(),
        ]);
        dispatch({ type: 'SET_DATA', payload: { members, classes, bookings } });
      } catch (err) {
        console.error('Erro ao carregar dados da API', err);
      }
    }
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// --- HOOK CUSTOMIZADO ---
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}