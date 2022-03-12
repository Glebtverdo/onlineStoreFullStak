const sequelize = require('../db.js');

const {DataTypes} = require('sequelize');

const User = sequelize.define("User", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
	email: {type: DataTypes.STRING, unique:true},
	login: {type: DataTypes.STRING},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: "USER"}
});

// {
//     email: "somethng",
//     logn: "hi",
//     pasword: "1234",
// }

const Basket = sequelize.define("Basket", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
});

const BasketItem = sequelize.define("BasketItem", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
	name: {type: DataTypes.STRING },
	cnt: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
	img: {type: DataTypes.STRING},
});

const Item = sequelize.define("Item", {
	id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, unique:true},
	type: {type: DataTypes.STRING},
	name: {type: DataTypes.STRING},
	about: {type: DataTypes.STRING},
	restCount: {type: DataTypes.INTEGER},
	price: {type: DataTypes.INTEGER},
	img: {type: DataTypes.STRING},
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Item.hasMany(BasketItem);
BasketItem.belongsTo(Item);

module.exports = {
	User, Basket, BasketItem, Item
}