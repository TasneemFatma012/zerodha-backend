const {model} = require('mongoose');
const { PositionSchema } = require('../schemas/PositionSchem');

const PositionModel = model('position', PositionSchema);
module.exports = { PositionModel };