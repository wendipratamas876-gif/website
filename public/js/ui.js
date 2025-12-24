class UIManager {
    constructor() {
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Launch attack button
        const launchAttackBtn = document.getElementById('launchAttackBtn');
        if (launchAttackBtn) {
            launchAttackBtn.addEventListener('click', () => {
                // Show attack modal or form
                showAttackModal();
            });
        }
        
        // Start CNC button
        const startCNCBtn = document.getElementById('startCNCBtn');
        if (startCNCBtn) {
            startCNCBtn.addEventListener('click', () => {
                startCNC();
            });
        }
        
        // Stop CNC button
        const stopCNCBtn = document.getElementById('stopCNCBtn');
        if (stopCNCBtn) {
            stopCNCBtn.addEventListener('click', () => {
                stopCNC();
            });
        }
        
        // Add VPS button
        const addVPSBtn = document.getElementById('addVPSBtn');
        if (addVPSBtn) {
            addVPSBtn.addEventListener('click', () => {
                showVPSModal();
            });
        }
        
        // Refresh button
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                location.reload();
            });
        }
    }
    
    showAttackModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Launch Attack</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="attackForm">
                        <div class="form-group">
                            <label>Target IP</label>
                            <input type="text" id="attackTarget" placeholder="192.168.1.1" required>
                        </div>
                        <div class="form-group">
                            <label>Target Port</label>
                            <input type="text" id="attackPort" placeholder="80" required>
                        </div>
                        <div class="form-group">
                            <label>Duration (seconds)</label>
                            <input type="number" id="attackDuration" placeholder="60" required>
                        </div>
                        <div class="form-group">
                            <label>Attack Method</label>
                            <select id="attackMethod" required>
                                <option value="">Select method</option>
                                ${attackManager.attackMethods.map(method => 
                                    `<option value="${method.id}">${method.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <button type="submit" class="btn primary">Launch Attack</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        // Form submission
        const attackForm = modal.querySelector('#attackForm');
        attackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const target = document.getElementById('attackTarget').value;
            const port = document.getElementById('attackPort').value;
            const duration = document.getElementById('attackDuration').value;
            const method = document.getElementById('attackMethod').value;
            
            attackManager.launchAttack(`${target}:${port}`, method, parseInt(duration));
            modal.remove();
        });
    }
    
    showVPSModal() {
        // Create VPS modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Add VPS</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="vpsForm">
                        <div class="form-group">
                            <label>Host/IP</label>
                            <input type="text" id="vpsHost" placeholder="vps.example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="vpsUsername" placeholder="root" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="vpsPassword" placeholder="password" required>
                        </div>
                        <button type="submit" class="btn success">Add VPS</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        // Form submission
        const vpsForm = modal.querySelector('#vpsForm');
        vpsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const host = document.getElementById('vpsHost').value;
            const username = document.getElementById('vpsUsername').value;
            const password = document.getElementById('vpsPassword').value;
            
            addVPS({ host, username, password });
            modal.remove();
        });
    }
}

// Initialize UI manager
const uiManager = new UIManager();

function startCNC() {
    // Simulate starting CNC
    showNotification('CNC Started Successfully', 'success');
    attackManager.updateUI();
}

function stopCNC() {
    // Simulate stopping CNC
    attackManager.stopAllAttacks();
    showNotification('CNC Stopped', 'info');
}

function addVPS(vps) {
    // Simulate adding VPS
    showNotification('VPS Added Successfully', 'success');
    attackManager.updateUI();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = UIManager;
}
