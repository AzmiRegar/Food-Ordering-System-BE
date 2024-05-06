const foodModel = require(`../models/index`).food
const Op = require(`sequelize`).Op
const path = require(`path`)
const fs = require(`fs`)

exports.getAllFood = async (request, response) => {
    let foods = await foodModel.findAll()
    return response.json({
        success: true,
        data: foods,
        message: "All foods have been loaded "
    })
}

exports.findFood = async (request, response) => {
    let keyword = request.params.key
    let foods = await foodModel.findAll({
        where: {
            [Op.or]: [
                { foodID: { [Op.substring]: keyword } },
                { name: { [Op.substring]: keyword } },
                { spicy_level: { [Op.substring]: keyword } },
                { price: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: foods,
        message: `Food has retrieved`
    })
}

const upload = require(`./upload-image`).single(`image`)

exports.addFood = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({ message: `Nothing image to Upload` })
        }

        let newFood = {
            name: request.body.name,
            spicy_level: request.body.spicy_level,
            price: request.body.price,
            image: request.file.filename
        }

        foodModel.create(newFood)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: "Food has created"
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.updateFood = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error });
        }

        let foodID = request.params.id;
        let dataFood = {
            name: request.body.name,
            spicy_level: request.body.spicy_level,
            price: request.body.price,
            image: request.file.filename
        };

        if (request.file) {
            const selectedFood = await foodModel.findOne({
                where: { foodID: foodID }
            });

            if (!selectedFood) {
                return response.json({
                    success: false,
                    message: "Food not found"
                });
            }

            const oldImage = selectedFood.image;
            const pathImage = path.join(__dirname, "../image", oldImage);
            if (fs.existsSync(pathImage)) {
                fs.unlink(pathImage, error => console.log(error));
            }
            dataFood.image = request.file.filename;
        }

        foodModel.update(dataFood, { where: { foodID: foodID } })
            .then(result => {
                return response.json({
                    success: true,
                    message: "Food has updated"
                });
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                });
            });
    });
};



exports.deleteFood = async (request, response) => {
    const foodID = request.params.id
    const food = await foodModel.findOne({where: {foodID:foodID}})
    const oldImage = food.image;
    const pathImage = path.join(__dirname, `../image`, oldImage)

    if(fs.existsSync(pathImage)) {
        fs.unlink(pathImage, error => console.log(error))
    }
    foodModel.destroy({ where: {foodID: foodID}})
        .then(result => {
            return response.json({
                success: true,
                message: `Data food has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}