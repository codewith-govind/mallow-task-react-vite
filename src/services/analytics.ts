const AnalyticsService = {
    trackLogin: (email: string): void => {
      console.log(`[ANALYTICS] User logged in: ${email}`);
    },
    trackLogout: (): void => {
      console.log('[ANALYTICS] User logged out.');
    },
    trackPageView: (pageName: string): void => {
      console.log(`[ANALYTICS] Page viewed: ${pageName}`);
    },
    trackUserAdded: (name: string, email: string): void => {
      console.log(`[ANALYTICS] User added: ${name} (${email})`);
    },
    trackUserUpdated: (id: number, name: string, email: string): void => {
      console.log(`[ANALYTICS] User updated: ID ${id}, ${name} (${email})`);
    },
    trackUserDeleted: (id: number): void => {
      console.log(`[ANALYTICS] User deleted: ID ${id}`);
    },
    trackViewToggle: (viewMode: string): void => { 
      console.log(`[ANALYTICS] View mode toggled to: ${viewMode}`);
    },
    trackSearch: (query: string): void => {
      console.log(`[ANALYTICS] User searched for: "${query}"`);
    },
  };
  
  export default AnalyticsService;
  