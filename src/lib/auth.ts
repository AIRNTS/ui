export const authUtils = {
  signIn: async (email: string, password: string) => {
    // Demo authentication
    if (email === "demo@example.com" && password === "demo") {
      return { success: true, user: { id: "1", email, name: "Demo User" } 
};
    }
    return { success: false, error: "Invalid credentials" };
  },
  
  signOut: async () => {
    return { success: true };
  }
};
