// @ts-check
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const baseOptions = {
    discriminatorKey: "type",
    collection: "adminUser",
};

const adminUserSchema = new mongoose.Schema({
    name: {type: String, allowNull: false},
    age: {type: Number, allowNull: false},
}, baseOptions);

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
