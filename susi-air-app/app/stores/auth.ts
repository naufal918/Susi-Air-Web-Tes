export const useAuthStore = defineStore('auth', {
  state: () => ({
    isSignedIn: false,
    username: ''
  }),
  actions: {
    signIn(username: string) {
      // No real authentication for this test — any non-empty credentials pass.
      this.isSignedIn = true
      this.username = username
    },
    signOut() {
      this.isSignedIn = false
      this.username = ''
    }
  }
})
