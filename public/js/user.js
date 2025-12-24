class UserManagement {
    constructor() {
        this.users = [];
        this.loadUsers();
    }
    
    loadUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                this.users = data;
            });
    }
    
    addUser(user) {
        this.users.push(user);
        this.saveUsers();
    }
    
    saveUsers() {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.users)
        });
    }
    
    deleteUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
        this.saveUsers();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = UserManagement;
}
