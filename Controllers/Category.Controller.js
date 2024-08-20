const mainCategory = require('../Models/Category.Model')

exports.createCategory = async (req, res) => {
    try {
        const { categoryName, subcategoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        const category = await mainCategory.create({
            categoryName,
            subcategoryName: subcategoryName || []
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating category',
        });
    }
};


exports.getAllCategory = async (req,res)=>{
    try {
        const allCategory = await mainCategory.find()
        if(!allCategory) {
            return res.status(400).json({
                success: false,
                message: 'No category found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'All categories found',
            data : allCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(500).json({
            success: false,
            message: 'Error fetching categories',
        })
    }
}

exports.singleCategory = async (req,res) => {
    try {
        const id = req.params._id
        const category = await mainCategory.findById(id)
        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'single category founded',
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error fetching single category',
        })
    }
}

exports.deleteCategory = async (req,res) => {
    try {
        const id = req.params._id;
        const category = await mainCategory.findByIdAndDelete(id)
        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Category Delete Successfully',
            data: category
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { _id } = req.params;
        const { categoryName, subcategoryName } = req.body;

        // Find the category by ID
        const category = await mainCategory.findById(_id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        if (categoryName) {
            category.categoryName = categoryName;
        }

        if (subcategoryName) {
            category.subcategoryName = subcategoryName;
        }

        await category.save();

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: category
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
