import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const baseOptions = {
    discriminatorKey: "type",
    collection: "adminUser",
};

const adminUserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true, max: 100, min: 1},
}, baseOptions);

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
