const mongoose = require("mongoose");

const clientUserSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  dateOfBirth: String,
  number: String,
  email: String,
  password: String,
  authProviders: [{provider: String, info: Object}]
});

module.exports = mongoose.model("clientusers", clientUserSchema);