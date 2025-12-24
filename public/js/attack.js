class AttackManager {
    constructor() {
        this.ongoingAttacks = [];
        this.attackHistory = [];
        this.attackMethods = [];
        this.loadAttackMethods();
    }
    
    loadAttackMethods() {
        fetch('/api/config')
            .then(response => response.json())
            .then(data => {
                this.attackMethods = data.attackMethods;
            });
    }
    
    launchAttack(target, method, duration) {
        const attack = {
            id: Date.now(),
            target,
            method,
            duration,
            startTime: new Date(),
            status: 'running'
        };
        
        this.ongoingAttacks.push(attack);
        this.updateUI();
        
        // Simulate attack completion
        setTimeout(() => {
            attack.status = 'completed';
            attack.endTime = new Date();
            this.attackHistory.push(attack);
            this.ongoingAttacks = this.ongoingAttacks.filter(a => a.id !== attack.id);
            this.updateUI();
        }, duration * 1000);
    }
    
    stopAllAttacks() {
        this.ongoingAttacks.forEach(attack => {
            attack.status = 'stopped';
            attack.endTime = new Date();
        });
        this.attackHistory.push(...this.ongoingAttacks);
        this.ongoingAttacks = [];
        this.updateUI();
    }
    
    updateUI() {
        // Update UI elements
        const ongoingCount = document.querySelector('.stat-value');
        if (ongoingCount) {
            ongoingCount.textContent = `⚡ ${this.ongoingAttacks.length}`;
        }
        
        // Update attacks list
        const attacksList = document.querySelector('.attacks-list');
        if (attacksList) {
            attacksList.innerHTML = '';
            
            this.ongoingAttacks.forEach(attack => {
                const attackItem = document.createElement('div');
                attackItem.className = 'attack-item';
                attackItem.innerHTML = `
                    <div class="attack-header">
                        <h3>${attack.method} Attack</h3>
                        <span class="attack-status running">RUNNING</span>
                    </div>
                    <div class="attack-details">
                        <p><strong>Target:</strong> ${attack.target}</p>
                        <p><strong>Duration:</strong> ${attack.duration}s</p>
                        <p><strong>Started:</strong> ${this.getTimeAgo(attack.startTime)}</p>
                    </div>
                `;
                attacksList.appendChild(attackItem);
            });
        }
    }
    
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}

// Initialize attack manager
const attackManager = new AttackManager();

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = AttackManager;
}
