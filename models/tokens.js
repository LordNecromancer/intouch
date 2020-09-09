const mongoose=require('mongoose');
const {Schema} =mongoose;

const tokenSchema = new mongoose.Schema({
    _user: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

mongoose.model('tokens',tokenSchema);