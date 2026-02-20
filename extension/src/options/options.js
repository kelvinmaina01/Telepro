// Telepro Options Page Script

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const defaultSpeedInput = document.getElementById('defaultSpeed');
    const speedValueDisplay = document.getElementById('speedValue');
    const defaultFontSizeSelect = document.getElementById('defaultFontSize');
    const defaultTextColorInput = document.getElementById('defaultTextColor');
    const defaultBgColorInput = document.getElementById('defaultBgColor');
    const mirrorTextCheckbox = document.getElementById('mirrorText');
    const autoExtractCheckbox = document.getElementById('autoExtract');
    const analyticsCheckbox = document.getElementById('analytics');
    const saveTextCheckbox = document.getElementById('saveText');
    const syncAccountBtn = document.getElementById('syncAccount');
    const manageSubscriptionBtn = document.getElementById('manageSubscription');
    const clearDataBtn = document.getElementById('clearData');
    const exportDataBtn = document.getElementById('exportData');
    const statusElement = document.getElementById('status');
    const accountStatusElement = document.getElementById('accountStatus');
    
    // Load saved settings
    loadSettings();
    
    // Event Listeners
    defaultSpeedInput.addEventListener('input', function() {
        speedValueDisplay.textContent = this.value;
        saveSetting('scrollSpeed', parseInt(this.value));
    });
    
    defaultFontSizeSelect.addEventListener('change', function() {
        saveSetting('fontSize', parseInt(this.value));
    });
    
    defaultTextColorInput.addEventListener('change', function() {
        saveSetting('textColor', this.value);
    });
    
    defaultBgColorInput.addEventListener('change', function() {
        saveSetting('backgroundColor', this.value);
    });
    
    mirrorTextCheckbox.addEventListener('change', function() {
        saveSetting('mirrorText', this.checked);
    });
    
    autoExtractCheckbox.addEventListener('change', function() {
        saveSetting('autoExtract', this.checked);
    });
    
    analyticsCheckbox.addEventListener('change', function() {
        saveSetting('analytics', this.checked);
    });
    
    saveTextCheckbox.addEventListener('change', function() {
        saveSetting('saveText', this.checked);
    });
    
    syncAccountBtn.addEventListener('click', syncAccount);
    clearDataBtn.addEventListener('click', clearData);
    exportDataBtn.addEventListener('click', exportData);
    
    // Check account status
    checkAccountStatus();
    
    // Functions
    function loadSettings() {
        chrome.storage.local.get(['teleproSettings'], function(result) {
            const settings = result.teleproSettings || {};
            
            // Update form fields
            if (settings.scrollSpeed !== undefined) {
                defaultSpeedInput.value = settings.scrollSpeed;
                speedValueDisplay.textContent = settings.scrollSpeed;
            }
            
            if (settings.fontSize !== undefined) {
                defaultFontSizeSelect.value = settings.fontSize;
            }
            
            if (settings.textColor !== undefined) {
                defaultTextColorInput.value = settings.textColor;
            }
            
            if (settings.backgroundColor !== undefined) {
                defaultBgColorInput.value = settings.backgroundColor;
            }
            
            if (settings.mirrorText !== undefined) {
                mirrorTextCheckbox.checked = settings.mirrorText;
            }
            
            if (settings.autoExtract !== undefined) {
                autoExtractCheckbox.checked = settings.autoExtract;
            }
            
            if (settings.analytics !== undefined) {
                analyticsCheckbox.checked = settings.analytics;
            }
            
            if (settings.saveText !== undefined) {
                saveTextCheckbox.checked = settings.saveText;
            }
        });
    }
    
    function saveSetting(key, value) {
        chrome.storage.local.get(['teleproSettings'], function(result) {
            const settings = result.teleproSettings || {};
            settings[key] = value;
            
            chrome.storage.local.set({ teleproSettings: settings }, function() {
                showStatus('Settings saved', 'success');
                
                // Notify background script about settings change
                chrome.runtime.sendMessage({
                    type: 'UPDATE_SETTINGS',
                    settings: { [key]: value }
                });
            });
        });
    }
    
    function checkAccountStatus() {
        // In a real implementation, this would check Firebase auth
        chrome.runtime.sendMessage({ type: 'AUTH_STATUS' }, function(response) {
            if (response && response.success) {
                if (response.authenticated) {
                    accountStatusElement.innerHTML = `
                        <p>Signed in as: <strong>${response.user?.email || 'User'}</strong></p>
                        <p>Subscription: <strong>${response.subscription?.plan || 'Free'}</strong></p>
                    `;
                    manageSubscriptionBtn.disabled = false;
                } else {
                    accountStatusElement.innerHTML = `
                        <p>Not signed in. <a href="https://telepro.harda.dev" target="_blank">Sign in on web app</a></p>
                    `;
                }
            }
        });
    }
    
    function syncAccount() {
        showStatus('Syncing account...', 'success');
        
        // In a real implementation, this would open auth flow
        setTimeout(() => {
            showStatus('Please sign in on the web app and refresh this page', 'success');
        }, 1000);
    }
    
    function clearData() {
        if (confirm('Are you sure you want to clear all local data? This cannot be undone.')) {
            chrome.storage.local.clear(function() {
                showStatus('All local data cleared', 'success');
                loadSettings(); // Reload default settings
                checkAccountStatus();
                
                // Notify background script
                chrome.runtime.sendMessage({ type: 'CLEAR_DATA' });
            });
        }
    }
    
    function exportData() {
        chrome.storage.local.get(null, function(data) {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'telepro-backup.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showStatus('Settings exported successfully', 'success');
        });
    }
    
    function showStatus(message, type) {
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            statusElement.className = 'status';
        }, 3000);
    }
    
    // Listen for account status updates
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type === 'ACCOUNT_UPDATED') {
            checkAccountStatus();
            sendResponse({ success: true });
        }
        return true;
    });
});