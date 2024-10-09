import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendActivateAccountEmail } from './mailController.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ error: 'User already exists.' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
      active: 0,
    });
    const savedUser = await newUser.save();

    const activationToken = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '15d' },
    );

    await sendActivateAccountEmail(savedUser, activationToken);

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: 'User does not exist.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid credentials.' });

    if (!user.active)
      return res.status(400).json({ error: 'User is not active.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const activateAccount = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findByIdAndUpdate(userId, { active: 1 }, { new: true });
    
    if (!user) return res.status(400).json({ error: "User not found." });

    res.status(200).json({ message: "Account activated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
