class VPSManagement {
    constructor() {
        this.vpsList = [];
        this.loadVPS();
    }
    
    loadVPS() {
        fetch('/api/vps')
            .then(response => response.json())
            .then(data => {
                this.vpsList = data;
            });
    }
    
    addVPS(vps) {
        this.vpsList.push(vps);
        this.saveVPS();
    }
    
    saveVPS() {
        fetch('/api/vps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.vpsList)
        });
    }
    
    checkVPSStatus() {
        this.vpsList.forEach(vps => {
            // Simulate VPS status check
            vps.status = Math.random() > 0.3 ? 'online' : 'offline';
        });
        this.saveVPS();
    }
    
    autoDeleteOfflineVPS() {
        setInterval(() => {
            this.checkVPSStatus();
            this.vpsList = this.vpsList.filter(vps => vps.status === 'online');
            this.saveVPS();
        }, 30000);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = VPSManagement;
}
