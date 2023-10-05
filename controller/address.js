const model = require('../model/address')
const Address = model.Address


exports.saveAddress  = async(req,res) => {
    try{
        const address = new Address ({
       ...req.body
        })

        await address.save()

        if (address){
            res.json({address, message: 'address saved successfully' })
        }

    }
    catch(error){
        console.error({error, message:'address not saved'})
    }
}

exports.getAddress = async(req,res) => {
    try{
        const userId = req.body.userId

        const addressOfUser = await Address.find({'userId': userId})

        if (addressOfUser) { 
            res.json(addressOfUser)
        }
    }
    catch(error){
        console.error({error, message:'some error fetching user address'})
    }
}