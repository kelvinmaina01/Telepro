// Telepro Content Script - Injects teleprompter overlay into web pages

console.log('Telepro content script loaded');

// Teleprompter overlay
class TeleprompterOverlay {
    constructor() {
        this.overlay = null;
        this.textElement = null;
        this.isActive = false;
        this.scrollPosition = 0;
        this.scrollSpeed = 50; // pixels per second
        this.scrollInterval = null;
        this.settings = {
            fontSize: 20,
            textColor: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            mirrorText: false
        };
        
        this.init();
    }
    
    init() {
        // Create overlay element
        this.overlay = document.createElement('div');
        this.overlay.id = 'telepro-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 999999;
            display: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
            pointer-events: none;
        `;
        
        // Create text container
        const textContainer = document.createElement('div');
        textContainer.id = 'telepro-text-container';
        textContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            box-sizing: border-box;
            overflow: hidden;
        `;
        
        // Create text element
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
            transition: transform 0.1s linear;
        `;
        
        // Create controls
        const controls = document.createElement('div');
        controls.id = 'telepro-controls';
        controls.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 8px;
            padding: 10px;
            display: flex;
            gap: 10px;
            pointer-events: auto;
            z-index: 1000000;
        `;
        
        // Add control buttons
        const closeBtn = this.createButton('×', 'Close Teleprompter', () => this.hide());
        const pauseBtn = this.createButton('⏸', 'Pause/Resume', () => this.togglePause());
        const speedUpBtn = this.createButton('⏩', 'Speed Up', () => this.adjustSpeed(10));
        const speedDownBtn = this.createButton('⏪', 'Slow Down', () => this.adjustSpeed(-10));
        
        controls.appendChild(speedDownBtn);
        controls.appendChild(pauseBtn);
        controls.appendChild(speedUpBtn);
        controls.appendChild(closeBtn);
        
        // Assemble overlay
        textContainer.appendChild(this.textElement);
        this.overlay.appendChild(textContainer);
        this.overlay.appendChild(controls);
        document.body.appendChild(this.overlay);
        
        // Listen for messages from background/popup
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sendResponse);
            return true; // Keep message channel open for async response
        });
        
        // Listen for keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        console.log('Telepro overlay initialized');
    }
    
    createButton(text, title, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.title = title;
        button.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s;
        `;
        button.addEventListener('mouseover', () => {
            button.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        button.addEventListener('mouseout', () => {
            button.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        button.addEventListener('click', onClick);
        return button;
    }
    
    handleMessage(message, sendResponse) {
        console.log('Content script received message:', message);
        
        switch (message.type) {
            case 'TELEPROMPTER_TOGGLE':
                if (message.active) {
                    this.show();
                } else {
                    this.hide();
                }
                sendResponse({ success: true });
                break;
                
            case 'UPDATE_TEXT':
                this.setText(message.text || '');
                sendResponse({ success: true });
                break;
                
            case 'UPDATE_SETTINGS':
                this.updateSettings(message.settings);
                sendResponse({ success: true });
                break;
                
            case 'EXTRACT_PAGE_TEXT':
                const pageText = this.extractPageText();
                sendResponse({ success: true, text: pageText });
                break;
                
            default:
                sendResponse({ success: false, error: 'Unknown message type' });
        }
    }
    
    show() {
        if (this.isActive) return;
        
        this.overlay.style.display = 'block';
        this.isActive = true;
        this.scrollPosition = 0;
        
        // Start scrolling
        this.startScrolling();
        
        console.log('Telepro overlay shown');
    }
    
    hide() {
        if (!this.isActive) return;
        
        this.overlay.style.display = 'none';
        this.isActive = false;
        
        // Stop scrolling
        this.stopScrolling();
        
        console.log('Telepro overlay hidden');
    }
    
    setText(text) {
        this.textElement.textContent = text || 'No text loaded. Enter text in the Telepro extension popup.';
        this.scrollPosition = 0;
        this.updateTextPosition();
    }
    
    updateSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        
        // Apply settings to text element
        this.textElement.style.fontSize = `${this.settings.fontSize}px`;
        this.textElement.style.color = this.settings.textColor;
        this.overlay.style.background = this.settings.backgroundColor;
        
        if (this.settings.mirrorText) {
            this.textElement.style.transform = 'scaleX(-1)';
        } else {
            this.textElement.style.transform = 'scaleX(1)';
        }
        
        // Update scroll speed
        if (settings.scrollSpeed !== undefined) {
            this.scrollSpeed = settings.scrollSpeed;
            this.stopScrolling();
            this.startScrolling();
        }
    }
    
    startScrolling() {
        if (this.scrollInterval) return;
        
        this.scrollInterval = setInterval(() => {
            this.scrollPosition += this.scrollSpeed / 60; // 60fps
            this.updateTextPosition();
            
            // Check if we've scrolled past all text
            const textHeight = this.textElement.scrollHeight;
            const containerHeight = this.overlay.clientHeight;
            
            if (this.scrollPosition > textHeight + containerHeight) {
                this.scrollPosition = -containerHeight; // Loop back to start
            }
        }, 1000 / 60); // 60fps
    }
    
    stopScrolling() {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
    }
    
    togglePause() {
        if (this.scrollInterval) {
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
    
    extractPageText() {
        // Extract main content from page
        const selectors = [
            'article',
            'main',
            '.content',
            '.post',
            '.article',
            '[role="main"]',
            'body'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.textContent.trim().length > 100) {
                return element.textContent.trim().substring(0, 5000); // Limit to 5000 chars
            }
        }
        
        // Fallback: get all text from body
        return document.body.textContent.trim().substring(0, 5000);
    }
    
    handleKeydown(e) {
        // Only handle if overlay is active
        if (!this.isActive) return;
        
        // Prevent default behavior for our shortcuts
        if (e.key === 'Escape') {
            e.preventDefault();
            this.hide();
        } else if (e.key === ' ') {
            e.preventDefault();
            this.togglePause();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.adjustSpeed(-5);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.adjustSpeed(5);
        }
    }
}

// Initialize teleprompter
const teleprompter = new TeleprompterOverlay();

// Notify background that content script is ready
chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT_READY' });

console.log('Telepro content script ready');