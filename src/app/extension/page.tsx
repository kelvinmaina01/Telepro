export default function ExtensionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Telepro Chrome Extension</h1>
          <p className="text-xl text-gray-400 mb-8">
            Take Telepro with you anywhere on the web
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Teleprompter Anywhere</h2>
            <p className="text-gray-400 mb-6 text-lg">
              Use Telepro on any website with our Chrome extension. Read scripts, 
              notes, or prompts while browsing, recording videos, or in video calls.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span>Works on any website</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span>Real-time text scrolling</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span>Customizable speed and appearance</span>
              </div>
            </div>
            
            <div className="mt-8">
              <a 
                href="https://chrome.google.com/webstore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:opacity-90 transition-all hover:scale-105 transform duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Add to Chrome - It's Free
              </a>
              <p className="text-sm text-gray-400 mt-2">No permissions required</p>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8">
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8">
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1"></div>
                  <div className="text-sm text-gray-400">Telepro Extension</div>
                </div>
                <div className="text-center py-8">
                  <div className="text-2xl font-bold mb-4">Your Script Here</div>
                  <div className="text-gray-400 text-sm">Scrolls automatically at your pace</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">How to Install</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-2xl">
              <div className="text-3xl mb-4">1</div>
              <h4 className="text-xl font-bold mb-2">Download Extension</h4>
              <p className="text-gray-400">Click "Add to Chrome" above</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl">
              <div className="text-3xl mb-4">2</div>
              <h4 className="text-xl font-bold mb-2">Pin to Toolbar</h4>
              <p className="text-gray-400">Pin the extension for quick access</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl">
              <div className="text-3xl mb-4">3</div>
              <h4 className="text-xl font-bold mb-2">Start Using</h4>
              <p className="text-gray-400">Click the icon on any webpage</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">For Content Creators</h4>
              <p className="text-gray-400">Read scripts while recording videos or streaming</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">For Meetings</h4>
              <p className="text-gray-400">Never forget your talking points in calls</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">For Students</h4>
              <p className="text-gray-400">Study notes that scroll as you read</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">For Professionals</h4>
              <p className="text-gray-400">Present with confidence in meetings</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Need help with installation?</p>
          <a 
            href="mailto:support@telepro.com" 
            className="text-blue-400 hover:text-blue-300"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}