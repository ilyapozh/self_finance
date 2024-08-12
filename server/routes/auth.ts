import { Router, Request, Response } from 'express';
import User, { CreateUserPayload }  from '../models/User'

const authRoute = Router()

authRoute.post('/signup', async (req: Request, response: Response) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    newUser.save()
        .then(res => {
            console.log('RESPONSE', res)

            return response.status(200).json(res);
        })
        .catch((err) => {
            console.log(err)
        })

    console.log('newUser', newUser)
    // console.log('userInDb', userInDb)

    // res.json(newUser);
  
    
    // res.status(200).json(newUser);
});

export default authRoute