// Function to create the module with dynamic values
const createSalesmanModule = (initialBaseSalary, initialBonusRate, initialSales = 0) => {
    let sales = initialSales; // Total sales amount, set dynamically
    const baseSalary = initialBaseSalary; // Base salary
    const bonusRate = initialBonusRate; // Bonus rate

    // Function to record a sale
    const recordSale = (amount) => {
        sales += amount; // Add the sale amount to the total sales
    };

    // Function to calculate the bonus
    const calculateBonus = (target) => {
        if (sales >= target) {
            return sales * bonusRate; // Calculate bonus if the target is met
        }
        return 0; // No bonus if the target is not met
    };

    // Function to calculate the total salary
    const calculateTotalSalary = (target) => {
        const bonus = calculateBonus(target); // Calculate bonus
        return baseSalary + bonus; // Total income = base salary + bonus
    };

    // Return public functions
    return {
        recordSale,
        calculateTotalSalary,
        getSales: () => sales, // Getter for the sales amount
    };
};

// Example usage
const salesmanModule = createSalesmanModule(3000, 0.1, 5000); // Module with a base salary of 3000, bonus rate of 10%, and initial sales amount of 5000
salesmanModule.recordSale(15000); // Record $15000 in sales
const target = 10000; // Set sales target
const totalSalary = salesmanModule.calculateTotalSalary(target); // Calculate total salary

console.log(`Total Sales: $${salesmanModule.getSales()}`); // Output current sales amount
console.log(`Total Salary: $${totalSalary.toFixed(2)}`); // Output total income
