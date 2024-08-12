import mongoose from 'mongoose'

export interface CreateUserPayload {
    name: string;
    email: string;
}


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

export default mongoose.model('User', UserSchema);