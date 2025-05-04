declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: any;
  }
}

const isGtagAvailable = () => {
  return typeof window !== 'undefined' && window.gtag && import.meta.env.PUBLIC_GA_TRACKING_ID;
};

export const analytics = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  capture: (eventName: string, properties?: Record<string, any>) => {
    if (isGtagAvailable()) {
      window.gtag('event', eventName, properties);
    }
  },

  trackPageView: (url?: string) => {
    const pageUrl = url || window.location.href;

    if (isGtagAvailable()) {
      window.gtag('event', 'page_view', {
        page_location: pageUrl,
        page_path: window.location.pathname,
      });
    }
  },
};
