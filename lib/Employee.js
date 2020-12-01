// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    };

    // Method to return the name when called
    getName() {
        return this.name;
    }

    // Method to return the ID when called
    getId() {
        return this.id;
    }

    // Method to return the Email when called
    getEmail() {
        return this.email;
    }

    // Method to return the a hard coded String when called
    getRole() {
        return "Employee"
    }
};

// Exports Employee class
module.exports = Employee;