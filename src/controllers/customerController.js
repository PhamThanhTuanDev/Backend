const { createCustomerService } = require("../services/customerService");

const {
    uploadSingleFile,
    uploadMultipleFiles,
} = require("../services/fileService");

module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, image, description } = req.body;

        let imageUrl = "";
        // image: String
        if (!req.files || Object.keys(req.files).length === 0) {
            // do nothing
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }

        let customerData = {
            name,
            address,
            phone,
            email,
            image: imageUrl,
            description,
        };
        let customer = await createCustomerService(customerData);

        return res.status(200).json({
            EC: 0,
            data: customer,
        });
    },
};
