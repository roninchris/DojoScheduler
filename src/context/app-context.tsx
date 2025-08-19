
"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import type { Member, Class, Booking } from '@/lib/types';
import { initialClasses, initialMembers } from '@/lib/data';
import { useRouter, usePathname } from 'next/navigation';

interface AppState {
  members: Member[];
  classes: Class[];
  bookings: Booking[];
  isAuthenticated: boolean;
}

type Action =
  | { type: 'ADD_MEMBER'; payload: Member }
  | { type: 'DELETE_MEMBER'; payload: string }
  | { type: 'ADD_CLASS'; payload: Class }
  | { type: 'DELETE_CLASS'; payload: string }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'SET_INITIAL_STATE'; payload: Partial<AppState> }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return { ...state, ...action.payload };
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };
    case 'DELETE_MEMBER':
        const newBookingsAfterMemberDelete = state.bookings.filter(b => b.memberId !== action.payload);
        const classesToUpdateAfterMemberDelete = state.classes.map(c => {
            const booking = state.bookings.find(b => b.memberId === action.payload && b.classId === c.id);
            if (booking) {
                return { ...c, enrolledMembers: c.enrolledMembers - 1 };
            }
            return c;
        });
      return {
        ...state,
        members: state.members.filter(member => member.id !== action.payload),
        bookings: newBookingsAfterMemberDelete,
        classes: classesToUpdateAfterMemberDelete
      };
    case 'ADD_CLASS':
      return { ...state, classes: [...state.classes, action.payload] };
    case 'DELETE_CLASS':
        const newBookingsAfterClassDelete = state.bookings.filter(b => b.classId !== action.payload);
      return {
          ...state,
          classes: state.classes.filter(c => c.id !== action.payload),
          bookings: newBookingsAfterClassDelete
        };
    case 'ADD_BOOKING':
      const updatedClasses = state.classes.map(c =>
        c.id === action.payload.classId ? { ...c, enrolledMembers: c.enrolledMembers + 1 } : c
      );
      return { ...state, bookings: [...state.bookings, action.payload], classes: updatedClasses };
    default:
      return state;
  }
}

const initialState: AppState = {
  members: [],
  classes: [],
  bookings: [],
  isAuthenticated: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('dojoSchedulerState');
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        dispatch({ type: 'SET_INITIAL_STATE', payload: parsedState });
      } else {
        dispatch({ type: 'SET_INITIAL_STATE', payload: { members: initialMembers, classes: initialClasses, bookings: [], isAuthenticated: false } });
      }
    } catch (error) {
      console.error("Could not load state from localStorage", error);
      dispatch({ type: 'SET_INITIAL_STATE', payload: { members: initialMembers, classes: initialClasses, bookings: [], isAuthenticated: false } });
    }
  }, []);

  useEffect(() => {
    try {
        const stateToStore = {
            ...state,
        };
      localStorage.setItem('dojoSchedulerState', JSON.stringify(stateToStore));
    } catch (error) {
      console.error("Could not save state to localStorage", error);
    }
  }, [state]);

  useEffect(() => {
    if (state.isAuthenticated === false && pathname !== '/login') {
        router.push('/login');
    }
    if (state.isAuthenticated && pathname === '/login') {
        router.push('/');
    }
  }, [state.isAuthenticated, pathname, router]);

  // While the authentication state is being determined, or during redirection,
  // don't render the children to avoid flicker.
  if (!state.isAuthenticated && pathname !== '/login') {
    return null; 
  }

  if (state.isAuthenticated && pathname === '/login') {
    return null;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
