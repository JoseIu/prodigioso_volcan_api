import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../model/user.model';

export const loginGoogleController = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const token = authorization!.split(' ')[1];
  const tokedDecoded = jwtDecode(token);
  const userDataByToken = tokedDecoded as UserInterface;

  const existUser = await User.findOne({ sub: userDataByToken.sub });

  //If not exit, create the user
  if (!existUser) {
    try {
      const newUser = new User(userDataByToken);
      const newUserSaved = await newUser.save();
      return res.status(201).json({ user: newUserSaved });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  return res.status(200).json({ user: existUser });
};
