const uploadSingleFile = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadPath = __dirname + fileObject.name;

    // Use the mv() method to place the file somewhere on your server

    //save => public/image/upload
    //abc.png => abc-timestamp.png
    //upload mutiple files

    try {
        await fileObject.mv(uploadPath);
        return {
            status: "success",
            path: "link-image",
            error: null,
        };
    } catch (err) {
        console.log(">>> Check err: ", err);
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(err),
        };
    }
};

const uploadMutipleFile = () => {};

module.exports = {
    uploadSingleFile,
    uploadMutipleFile,
};
