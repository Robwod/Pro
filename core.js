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
        }
        .roqate-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
    `,

    init() {
        this.injectStyles();
        this.positionButton();
        this.setupFeatures();
    },

    positionButton() {
        const notificationBell = document.querySelector('#common-notification-bell');
        if (notificationBell) {
            const button = document.createElement('button');
            button.className = 'roqate-button';
            button.innerHTML = '🚀 Roqate';
            button.onclick = () => this.toggleRobux();
            notificationBell.parentNode.insertBefore(button, notificationBell);
        }
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
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => RoqatePro.init());
} else {
    RoqatePro.init();
}
