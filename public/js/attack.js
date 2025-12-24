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
        this.saveAttack();
        
        // Simulate attack completion
        setTimeout(() => {
            attack.status = 'completed';
            attack.endTime = new Date();
            this.attackHistory.push(attack);
            this.ongoingAttacks = this.ongoingAttacks.filter(a => a.id !== attack.id);
            this.saveAttack();
        }, duration * 1000);
    }
    
    stopAllAttacks() {
        this.ongoingAttacks.forEach(attack => {
            attack.status = 'stopped';
            attack.endTime = new Date();
        });
        this.attackHistory.push(...this.ongoingAttacks);
        this.ongoingAttacks = [];
        this.saveAttack();
    }
    
    saveAttack() {
        // Save to local storage or send to server
        localStorage.setItem('attacks', JSON.stringify({
            ongoing: this.ongoingAttacks,
            history: this.attackHistory
        }));
    }
    
    getAttackMethods() {
        return this.attackMethods;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = AttackManager;
}
