const admin = require("../firebase/firebaseAdmin");

const GetUserAvatar = async (firebaseUid) => {
    const userRecord = await admin.auth().getUser(firebaseUid);
    return userRecord.photoURL;
};

module.exports = GetUserAvatar;