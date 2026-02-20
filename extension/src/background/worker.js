// Background service worker for Telepro Chrome Extension
// Handles authentication, state management, and messaging

console.log('Telepro background worker started');

// Initialize extension state
const state = {
  user: null,
  subscription: null,
  teleprompterActive: false,
  recording: false,
  currentText: '',
  settings: {
    scrollSpeed: 50,
    fontSize: 24,
    textColor: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    mirrorText: false
  }
};

// Load saved state from storage
chrome.storage.local.get(['teleproState'], (result) => {
  if (result.teleproState) {
    Object.assign(state, result.teleproState);
    console.log('Loaded saved state:', state);
  }
});

// Save state to storage
function saveState() {
  chrome.storage.local.set({ teleproState: state });
}

// Handle messages from popup, content scripts, and options page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  switch (message.type) {
    case 'GET_STATE':
      sendResponse({ success: true, state });
      break;
      
    case 'UPDATE_SETTINGS':
      state.settings = { ...state.settings, ...message.settings };
      saveState();
      sendResponse({ success: true, settings: state.settings });
      break;
      
    case 'TOGGLE_TELEPROMPTER':
      state.teleprompterActive = !state.teleprompterActive;
      saveState();
      
      // Notify all tabs to update teleprompter visibility
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              type: 'TELEPROMPTER_TOGGLE',
              active: state.teleprompterActive
            });
          }
        });
      });
      
      sendResponse({ success: true, active: state.teleprompterActive });
      break;
      
    case 'SET_TEXT':
      state.currentText = message.text;
      saveState();
      
      // Broadcast text update to active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: 'UPDATE_TEXT',
            text: state.currentText
          });
        }
      });
      
      sendResponse({ success: true });
      break;
      
    case 'START_RECORDING':
      state.recording = true;
      saveState();
      sendResponse({ success: true, recording: true });
      break;
      
    case 'STOP_RECORDING':
      state.recording = false;
      saveState();
      sendResponse({ success: true, recording: false });
      break;
      
    case 'AUTH_STATUS':
      // In a real implementation, this would check Firebase auth
      sendResponse({ 
        success: true, 
        authenticated: !!state.user,
        user: state.user,
        subscription: state.subscription
      });
      break;
      
    default:
      sendResponse({ success: false, error: 'Unknown message type' });
  }
  
  return true; // Keep message channel open for async response
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  console.log('Command received:', command);
  
  switch (command) {
    case 'toggle_teleprompter':
      chrome.runtime.sendMessage({ type: 'TOGGLE_TELEPROMPTER' });
      break;
      
    case 'start_recording':
      chrome.runtime.sendMessage({ 
        type: state.recording ? 'STOP_RECORDING' : 'START_RECORDING' 
      });
      break;
  }
});

// Handle tab updates to inject teleprompter when needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && state.teleprompterActive) {
    // Inject teleprompter into the newly loaded page
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, {
        type: 'TELEPROMPTER_TOGGLE',
        active: true
      });
    }, 500);
  }
});

// Keep service worker alive
setInterval(() => {
  console.log('Telepro background worker alive');
}, 30000);