import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
    phoneNumber: { type: String, unique: true},
    email: { type: String, unique: true},
    name: String,
    ranking: String,
    posicaoRanking: Number,
    urlPlayer: String,
}, {timestamps: true, collection: 'jogadores'});
