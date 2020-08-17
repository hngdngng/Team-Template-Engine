const Employee = require("../lib/Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNum) {
        super (name, id, email, officeNum);
        this.officeNumber = officeNum;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;