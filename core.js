const RoqatePro = {
    version: '1.0.0',
    isActive: false,
    originalRobux: '',
    styles: `
        .roqate-button {
            position: absolute;
            top: 0;
            right: 45px;
            z-index: 999;
            background: linear-gradient(45deg, #00b06f, #009960);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Gotham SSm', sans-serif;
            transition: all 0.3s ease;
            margin-top: 3px;
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .roqate-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            background: linear-gradient(45deg, #00c77d, #00b06f);
        }
        .roqate-panel {
            position: fixed;
            top: 60px;
            right: 20px;
            background: linear-gradient(145deg, #1e1e1e, #2d2d2d);
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            display: none;
            width: 300px;
            font-family: 'Gotham SSm', sans-serif;
        }
        .roqate-feature {
            margin: 10px 0;
            padding: 12px;
            background: rgba(255,255,255,0.1);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .roqate-feature:hover {
            background: rgba(255,255,255,0.15);
            transform: translateX(5px);
        }
        .roqate-heading {
            color: #00b06f;
            margin: 0 0 15px 0;
            font-size: 18px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .roqate-amount-input {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
            border: none;
            border-radius: 4px;
            background: rgba(255,255,255,0.1);
            color: white;
        }
        .roqate-active {
            background: linear-gradient(45deg, #00d88a, #00c77d);
        }
    `,

    init() {
        this.injectStyles();
        this.positionButton();
        this.createPanel();
        this.setupFeatures();
    },

    positionButton() {
        const notificationBell = document.querySelector('#common-notification-bell');
        if (notificationBell) {
            const button = document.createElement('button');
            button.className = 'roqate-button';
            button.innerHTML = '🚀 Roqate';
            button.onclick = () => this.togglePanel();
            notificationBell.parentNode.insertBefore(button, notificationBell);
        }
    },

    createPanel() {
        const panel = document.createElement('div');
        panel.className = 'roqate-panel';
        panel.innerHTML = `
            <h2 class="roqate-heading">Roqate Pro</h2>
            <div class="roqate-feature" onclick="RoqatePro.toggleRobux()">
                💎 Toggle 100K Robux
            </div>
            <div class="roqate-feature" onclick="RoqatePro.toggleMillionRobux()">
                💰 Toggle 1M Robux
            </div>
            <div class="roqate-feature">
                🎯 Custom Amount
                <input type="text" class="roqate-amount-input" placeholder="Enter Robux amount" onchange="RoqatePro.setCustomAmount(this.value)">
            </div>
            <div class="roqate-feature" onclick="RoqatePro.togglePremium()">
                👑 Toggle Premium Badge
            </div>
        `;
        document.body.appendChild(panel);
    },

    togglePanel() {
        const panel = document.querySelector('.roqate-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    },

    toggleRobux() {
        const robuxElement = document.querySelector('#nav-robux-amount');
        if (robuxElement) {
            if (!this.isActive) {
                this.originalRobux = robuxElement.textContent;
                robuxElement.textContent = '100,000';
                this.isActive = true;
            } else {
                robuxElement.textContent = this.originalRobux;
                this.isActive = false;
            }
        }
    },

    toggleMillionRobux() {
        const robuxElement = document.querySelector('#nav-robux-amount');
        if (robuxElement) {
            if (!this.isActive) {
                this.originalRobux = robuxElement.textContent;
                robuxElement.textContent = '1,000,000';
                this.isActive = true;
            } else {
                robuxElement.textContent = this.originalRobux;
                this.isActive = false;
            }
        }
    },

    setCustomAmount(amount) {
        const robuxElement = document.querySelector('#nav-robux-amount');
        if (robuxElement && amount) {
            this.originalRobux = robuxElement.textContent;
            robuxElement.textContent = Number(amount).toLocaleString();
            this.isActive = true;
        }
    },

    togglePremium() {
        // Premium badge toggle logic here
        const premiumButton = document.querySelector('.roqate-feature:last-child');
        premiumButton.classList.toggle('roqate-active');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => RoqatePro.init());
} else {
    RoqatePro.init();
}
