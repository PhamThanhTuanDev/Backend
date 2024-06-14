const Customer = require("../models/customer");

module.exports = {
    createCustomerService: async (customerData) => {
        try {
            let result = await Customer.create({
                name: customerData.name,
                address: customerData.address,
                phone: customerData.phone,
                email: customerData.email,
                image: customerData.image,
                description: customerData.description,
            });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
