const { User } = require('./../models/User')
const jwt = require('jsonwebtoken')
const defaultPhoto =
  'https://riatarealty.com/wp-content/uploads/2020/03/generic-person-silhouette-32.png'

module.exports.me_get = (req, res) => {
  const user = res.locals.user
  res.json(user)
}

module.exports.me_put = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    // Decode the JWT to get the payload
    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    // Extract the id value from the payload
    const user = await User.findById(id)
    console.log(req.body)
    // Update the user object with the new data
    let { firstName, lastName, photo, shippingAddress } = req.body

    photo = photo || defaultPhoto
    firstName = firstName || user.firstName
    lastName = lastName || user.lastName

    // Save the updated user object to the database
    const aknowlege = await User.updateOne(
      { _id: user._id },
      { $set: { firstName, lastName, shippingAddress, photo } }
    )
    const updatedUser = await User.findById(id)

    console.log(updatedUser)
    console.log('updated', aknowlege)

    delete updatedUser._doc.password
    // to be sure
    res.json({
      message: 'updated successfully',
      user: updatedUser,
    })
  } catch (err) {
    console.log('err put me', err)
    next(err)
  }
}

module.exports.remove_user=async(req,res)=>{

  const user_id= await User.findOne({_id:req.params.id})
  
  if(user_id){
  
    try{
     await User.deleteOne({_id:req.params.id})
     res.status(400).json({message:"user deleted successfully."})

    }
    catch(err){
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' })
    }
  
  }
  else{
    res.status(404).send("User is not found");
  }
}

module.exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find()
    for(let i=0; i<users.length; i++) {
      delete users[i]._doc.password;
    }
    
    return res.json(users)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}