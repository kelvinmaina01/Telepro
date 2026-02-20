// Telepro Overlay Script (for web_accessible_resources)

console.log('Telepro overlay script loaded');

// This script is loaded as a web accessible resource
// It can be injected into pages that need the teleprompter overlay

class TeleproOverlay {
    constructor() {
        this.overlay = null;
        this.textElement = null;
        this.controls = null;
        this.isActive = false;
        this.scrollPosition = 0;
        this.scrollSpeed = 50;
        this.scrollInterval = null;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        // Check if overlay already exists
        if (document.getElementById('telepro-overlay')) {
            console.log('Telepro overlay already exists');
            return;
        }
        
        // Create overlay from HTML template
        const template = document.getElementById('telepro-overlay-template');
        if (template) {
            this.overlay = template.content.cloneNode(true).firstElementChild;
        } else {
            // Fallback: create overlay programmatically
            this.createOverlay();
        }
        
        document.body.appendChild(this.overlay);
        
        // Get references to elements
        this.textElement = document.getElementById('telepro-text');
        this.controls = document.getElementById('telepro-controls');
        
        // Set up controls
        this.setupControls();
        
        // Listen for messages
        this.setupMessageListener();
        
        console.log('Telepro overlay created');
    }
    
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'telepro-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            z-index: 2147483647;
            display: none;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        `;
        
        const textContainer = document.createElement('div');
        textContainer.id = 'telepro-text-container';
        textContainer.style.cssText = `
            width: 100%;
            height: 100%;
            padding: 40px;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        this.textElement = document.createElement('div');
        this.textElement.id = 'telepro-text';
        this.textElement.style.cssText = `
            color: #ffffff;
            font-size: 24px;
            line-height: 1.6;
            text-align: center;
            white-space: pre-wrap;
            max-width: 800px;
            margin: 0 auto;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            font-weight: 500;
            letter-spacing: 0.3px;
            transition: transform 0.1s linear;
        `;
        this.textElement.textContent = 'Telepro Teleprompter Ready';
        
        this.controls = document.createElement('div');
        this.controls.id = 'telepro-controls';
        this.controls.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 8px;
            padding: 10px;
            display: flex;
            gap: 10px;
            z-index: 2147483648;
        `;
        
        textContainer.appendChild(this.textElement);
        this.overlay.appendChild(textContainer);
        this.overlay.appendChild(this.controls);
    }
    
    setupControls() {
        // Clear existing controls
        this.controls.innerHTML = '';
        
        // Create control buttons
        const buttons = [
            { text: '⏪', title: 'Slow Down', action: () => this.adjustSpeed(-10) },
            { text: '⏸', title: 'Pause/Resume', action: () => this.togglePause() },
            { text: '⏩', title: 'Speed Up', action: () => this.adjustSpeed(10) },
            { text: '×', title: 'Close', action: () => this.hide() }
        ];
        
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'telepro-btn';
            button.textContent = btn.text;
            button.title = btn.title;
            button.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                padding: 8px 12px;
                font-size: 16px;
                cursor: pointer;
                transition: background 0.2s;
                font-family: inherit;
                min-width: 40px;
                min-height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            button.addEventListener('click', btn.action);
            this.controls.appendChild(button);
        });
    }
    
    setupMessageListener() {
        // Listen for messages from content script
        window.addEventListener('message', (event) => {
            // Only accept messages from our extension
            if (event.source !== window) return;
            
            const message = event.data;
            if (!message || message.source !== 'telepro-extension') return;
            
            console.log('Overlay received message:', message);
            
            switch (message.type) {
                case 'SHOW_OVERLAY':
                    this.show();
                    break;
                    
                case 'HIDE_OVERLAY':
                    this.hide();
                    break;
                    
                case 'UPDATE_TEXT':
                    this.setText(message.text);
                    break;
                    
                case 'UPDATE_SETTINGS':
                    this.updateSettings(message.settings);
                    break;
            }
        });
    }
    
    show() {
        if (this.isActive) return;
        
        this.overlay.style.display = 'flex';
        this.isActive = true;
        this.scrollPosition = 0;
        this.isPaused = false;
        
        this.startScrolling();
        
        console.log('Telepro overlay shown');
    }
    
    hide() {
        if (!this.isActive) return;
        
        this.overlay.style.display = 'none';
        this.isActive = false;
        this.stopScrolling();
        
        console.log('Telepro overlay hidden');
    }
    
    setText(text) {
        this.textElement.textContent = text || 'No text loaded';
        this.scrollPosition = 0;
        this.updateTextPosition();
    }
    
    updateSettings(settings) {
        if (settings.fontSize) {
            this.textElement.style.fontSize = `${settings.fontSize}px`;
        }
        
        if (settings.textColor) {
            this.textElement.style.color = settings.textColor;
        }
        
        if (settings.backgroundColor) {
            this.overlay.style.background = settings.backgroundColor;
        }
        
        if (settings.scrollSpeed !== undefined) {
            this.scrollSpeed = settings.scrollSpeed;
            this.stopScrolling();
            this.startScrolling();
        }
        
        if (settings.mirrorText !== undefined) {
            this.textElement.style.transform = settings.mirrorText ? 'scaleX(-1)' : 'scaleX(1)';
        }
    }
    
    startScrolling() {
        if (this.scrollInterval || this.isPaused) return;
        
        this.scrollInterval = setInterval(() => {
            this.scrollPosition += this.scrollSpeed / 60;
            this.updateTextPosition();
            
            // Check if we've scrolled past all text
            const textHeight = this.textElement.scrollHeight;
            const containerHeight = this.overlay.clientHeight;
            
            if (this.scrollPosition > textHeight + containerHeight) {
                this.scrollPosition = -containerHeight;
            }
        }, 1000 / 60);
    }
    
    stopScrolling() {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.stopScrolling();
        } else {
            this.startScrolling();
        }
    }
    
    adjustSpeed(amount) {
        this.scrollSpeed = Math.max(10, Math.min(100, this.scrollSpeed + amount));
        this.stopScrolling();
        this.startScrolling();
    }
    
    updateTextPosition() {
        this.textElement.style.transform = `translateY(-${this.scrollPosition}px)`;
    }
}

// Initialize overlay when script loads
const teleproOverlay = new TeleproOverlay();

// Export for external use
window.TeleproOverlay = teleproOverlay;

console.log('Telepro overlay ready');