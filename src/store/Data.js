import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const testUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    roleId: 1,
    isActive: true
  },
  {
    id: '2',
    name: 'Moderator',
    email: 'mod1@example.com',
    password: 'mod123',
    roleId: 2,
    isActive: true
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user1@example.com',
    password: 'user123',
    roleId: 3,
    isActive: true
  }
];

const roles = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'Moderator',
  },
  {
    id: 3,
    name: 'User',
  }
];

export const Data = create(
  persist(
    (set) => ({
      users: testUsers,
      roles,
      currentUser: null,

      login: (email, password) => {
        const user = testUsers.find(
          u => u.email === email && u.password === password
        );

        if (user) {
          const userWithoutPassword = { ...user };
          delete userWithoutPassword.password;
          set({ currentUser: userWithoutPassword });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null });
      },

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, { ...user, id: crypto.randomUUID() }]
        })),

      updateUser: (userId, updates) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? {
                ...user,
                ...updates,
                roleId: parseInt(updates.roleId, 10)
              }
              : user
          ),
        }));
      },

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter(user => user.id !== id)
        })),
    }),
    {
      name: 'rbac-storage',
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
) 