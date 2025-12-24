class AutoDeleteManager {
    constructor() {
        this.vpsManager = new VPSManagement();
        this.startAutoDelete();
    }
    
    startAutoDelete() {
        setInterval(() => {
            this.vpsManager.checkVPSStatus();
            this.vpsManager.vpsList = this.vpsManager.vpsList.filter(vps => vps.status === 'online');
            this.vpsManager.saveVPS();
        }, 30000);
    }
    
    stopAutoDelete() {
        clearInterval(this.autoDeleteInterval);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = AutoDeleteManager;
}
