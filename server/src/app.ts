import express, {Router, Request, Response} from 'express';
import cors from 'cors';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserRepository } from './Domain/repositories/users/IUserRepository';
import { UserRepository } from './Database/repositories/users/UserRepository';
import { AuthController } from './WebAPI/controllers/AuthController';
import { IUserService } from './Domain/services/users/IUserService';
import { UserService } from './Services/users/UserService';
import { UserController } from './WebAPI/controllers/UserController';
import { IContentRepository } from './Domain/repositories/contents/IContentRepository';
import { ContentRepository } from './Database/repositories/contents/ContentRepository';
import { IContentService } from './Domain/services/contents/IContentService';
import { ContentService } from './Services/contents/ContentService';
import { ContentController } from './WebAPI/controllers/ContentController';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const contentRepository: IContentRepository = new ContentRepository();
// Services
const authService: IAuthService = new AuthService(userRepository);
const userService: IUserService = new UserService(userRepository);
const contentService: IContentService = new ContentService(contentRepository);

// WebAPI routes
const authController = new AuthController(authService);
const userController = new UserController(userService);
const contentController = new ContentController(contentService);
// Registering routes
app.use('/api/v1', authController.getRouter());
app.use('/api/v1', userController.getRouter());
console.log("Before registering contentController");
app.use('/api/v1', contentController.getRouter());
console.log("After registering contentController");



export default app; 

