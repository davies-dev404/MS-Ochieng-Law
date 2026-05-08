import Pusher from 'pusher-js';

// Configuration for real-time features
const PUSHER_APP_KEY = import.meta.env.VITE_PUSHER_APP_KEY;
const PUSHER_CLUSTER = import.meta.env.VITE_PUSHER_APP_CLUSTER;

if (!PUSHER_APP_KEY) {
  console.warn("Pusher API Key missing in .env file");
}

// Initialize Pusher
export const pusher = new Pusher(PUSHER_APP_KEY || '', {
  cluster: PUSHER_CLUSTER || 'mt1',
  forceTLS: true,
  enabledTransports: ['ws', 'wss'],
});

// Helper to subscribe to the global channel
export const globalChannel = pusher.subscribe('my-channel');

/**
 * Triggers a real-time event. 
 * Note: In a production app, this should be done from the server.
 * For this project, we are using it to sync the local blog states.
 */
export const triggerLiveEvent = async (eventName, data) => {
  // We can also use the native 'storage' event for same-browser syncing
  window.dispatchEvent(new Event('blog-updated'));
  
  // If the user wants to use Pusher for cross-device sync without a backend, 
  // they would typically use a serverless function. 
  // For now, we use the storage event for instant local feedback.
  console.log(`Live Event Triggered: ${eventName}`, data);
};


// Predefined event listeners for common "live" actions
export const onLiveNotification = (callback) => {
  globalChannel.bind('my-event', callback);
};

export const onStaffStatusChange = (callback) => {
  globalChannel.bind('staff-status', callback);
};

