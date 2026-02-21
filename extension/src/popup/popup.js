// Telepro Chrome Extension Popup Script

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const toggleTeleprompterBtn = document.getElementById('toggleTeleprompter');
    const startRecordingBtn = document.getElementById('startRecording');
    const teleprompterText = document.getElementById('teleprompterText');
    const statusElement = document.getElementById('status');
    const textLengthElement = document.getElementById('textLength');
    const scrollSpeedInput = document.getElementById('scrollSpeed');
    const speedValueElement = document.getElementById('speedValue');
    const fontSizeSelect = document.getElementById('fontSize');
    const textColorInput = document.getElementById('textColor');
    const bgColorInput = document.getElementById('bgColor');
    const settingsLink = document.getElementById('settings');
    
    // State
    let state = {
        teleprompterActive: false,
        recording: false,
        currentText: '',
        settings: {
            scrollSpeed: 50,
            fontSize: 20,
            textColor: '#ffffff',
            backgroundColor: '#000000'
        }
    };
    
    // Initialize
    loadState();
    updateUI();
    
    // Event Listeners
    toggleTeleprompterBtn.addEventListener('click', function() {
        console.log('Toggle teleprompter button clicked');
        toggleTeleprompter();
    });
    startRecordingBtn.addEventListener('click', function() {
        console.log('Start recording button clicked');
        toggleRecording();
    });
    
    teleprompterText.addEventListener('input', function() {
        updateTextLength();
        saveText();
    });
    
    scrollSpeedInput.addEventListener('input', function() {
        const speed = parseInt(this.value);
        speedValueElement.textContent = speed;
        updateSetting('scrollSpeed', speed);
    });
    
    fontSizeSelect.addEventListener('change', function() {
        updateSetting('fontSize', parseInt(this.value));
    });
    
    textColorInput.addEventListener('change', function() {
        updateSetting('textColor', this.value);
    });
    
    bgColorInput.addEventListener('change', function() {
        updateSetting('backgroundColor', this.value);
    });
    
    settingsLink.addEventListener('click', function(e) {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
    });
    
    // Functions
    function loadState() {
        chrome.storage.local.get(['teleproState'], function(result) {
            if (result.teleproState) {
                state = result.teleproState;
                updateUI();
                
                // Update form fields
                teleprompterText.value = state.currentText || '';
                scrollSpeedInput.value = state.settings.scrollSpeed;
                speedValueElement.textContent = state.settings.scrollSpeed;
                fontSizeSelect.value = state.settings.fontSize;
                textColorInput.value = state.settings.textColor;
                bgColorInput.value = state.settings.backgroundColor;
                
                updateTextLength();
            }
        });
    }
    
    function saveState() {
        chrome.storage.local.set({ teleproState: state });
    }
    
    function updateUI() {
        // Update teleprompter button
        if (state.teleprompterActive) {
            toggleTeleprompterBtn.textContent = 'Disable Teleprompter';
            toggleTeleprompterBtn.classList.add('active');
            statusElement.textContent = 'Active';
            statusElement.className = 'status-value active';
        } else {
            toggleTeleprompterBtn.textContent = 'Enable Teleprompter';
            toggleTeleprompterBtn.classList.remove('active');
            statusElement.textContent = 'Inactive';
            statusElement.className = 'status-value inactive';
        }
        
        // Update recording button
        if (state.recording) {
            startRecordingBtn.textContent = 'Stop Recording';
            startRecordingBtn.classList.add('recording');
        } else {
            startRecordingBtn.textContent = 'Start Recording';
            startRecordingBtn.classList.remove('recording');
        }
    }
    
    function updateTextLength() {
        const length = teleprompterText.value.length;
        textLengthElement.textContent = `${length} chars`;
    }
    
    function toggleTeleprompter() {
        console.log('toggleTeleprompter function called');
        chrome.runtime.sendMessage(
            { type: 'TOGGLE_TELEPROMPTER' },
            function(response) {
                console.log('Toggle teleprompter response:', response);
                if (response && response.success) {
                    state.teleprompterActive = response.active;
                    saveState();
                    updateUI();
                } else {
                    console.error('Toggle teleprompter failed:', response);
                }
            }
        );
    }
    
    function toggleRecording() {
        console.log('toggleRecording called, current state:', state.recording);
        const messageType = state.recording ? 'STOP_RECORDING' : 'START_RECORDING';
        console.log('Sending message type:', messageType);
        
        chrome.runtime.sendMessage(
            { type: messageType },
            function(response) {
                console.log('Recording response:', response);
                if (response && response.success) {
                    state.recording = response.recording;
                    saveState();
                    updateUI();
                } else {
                    console.error('Recording failed:', response);
                }
            }
        );
    }
    
    function saveText() {
        state.currentText = teleprompterText.value;
        saveState();
        
        // Send text to background for broadcasting
        chrome.runtime.sendMessage(
            { type: 'SET_TEXT', text: state.currentText },
            function(response) {
                if (!response || !response.success) {
                    console.error('Failed to save text:', response?.error);
                }
            }
        );
    }
    
    function updateSetting(key, value) {
        state.settings[key] = value;
        saveState();
        
        // Send settings update to background
        chrome.runtime.sendMessage(
            { 
                type: 'UPDATE_SETTINGS', 
                settings: { [key]: value }
            },
            function(response) {
                if (!response || !response.success) {
                    console.error('Failed to update setting:', response?.error);
                }
            }
        );
    }
    
    // Try to extract text from current page
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0] && !state.currentText) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { type: 'EXTRACT_PAGE_TEXT' },
                function(response) {
                    if (response && response.text && !teleprompterText.value) {
                        teleprompterText.value = response.text;
                        saveText();
                        updateTextLength();
                    }
                }
            );
        }
    });
    
    // Listen for state updates from background
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type === 'STATE_UPDATE') {
            state = message.state;
            updateUI();
            sendResponse({ success: true });
        }
        return true;
    });
    
    // Update text length on load
    updateTextLength();
});