const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')


//get all users
router.get('/users', async (req,res,next)=>{
  try{
    const users = await Users.find()
    res.status(200).json(users)
  }
  catch(err){next(err)}

})

//remove user bsade in given id

router.delete('/users/:id', async (req,res,next)=>{
  try{
    await Users.remove(req.params.id)
    res.send({message: `user with id ${req.params.id} is deleted successfully`})
  }
  catch(err){next(err)}
})


router.post('/register', async (req, res,next) => {
  // res.end('implement register, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }*/    

      /*

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */

  try{
    const {username,password} = req.body 
    
    if(!username || !password){
      return res.status(409).json({message: "username and password required"})
    }

    const user = await Users.findBy({username}).first()

    if(user){
      return res.status(409).json({message: "username taken"})
    }
    const newUser = await Users.create({
      username,
      password: await bcrypt.hash(password,12)
    })
    res.status(201).json(newUser)

  }
  catch(err){next(err)}
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
