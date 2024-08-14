const mainCategory = require('../Models/Category.Model')

exports.createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }

        const category = await mainCategory.create({
            categoryName
        })

        res.status(200).json({
            success: true,
            message: 'Category created successfully',
            data: category
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error creating category',
        })
    }
}