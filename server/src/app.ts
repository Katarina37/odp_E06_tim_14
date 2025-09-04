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
import { IEpisodeRepository } from './Domain/repositories/episodes/IEpisodeRepository';
import { EpisodeRepository } from './Database/repositories/episodes/EpisodeRepository';
import { IEpisodeService } from './Domain/services/episodes/IEpisodeService';
import { EpisodeService } from './Services/episodes/EpisodeService';
import { EpisodeController } from './WebAPI/controllers/EpisodeController';
import { IOcjenaRepository } from './Domain/repositories/ratings/IOcjenaRepository';
import { OcjenaRepository } from './Database/repositories/ratings/OcjenaRepository';
import { IOcjenaService } from './Domain/services/ratings/IOcjenaService';
import { OcjenaService } from './Services/ratings/OcjenaService';
import { RatingController } from './WebAPI/controllers/RatingController';
import { ITriviaRepository } from './Domain/repositories/trivia/ITriviaRepository';
import { TriviaRepository } from './Database/repositories/trivia/TriviaRepository';
import { AdminController } from './WebAPI/controllers/AdminController';
import { validateContent } from './MiddleWares/validation/ContentValidation';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const contentRepository: IContentRepository = new ContentRepository();
const episodeRepository: IEpisodeRepository = new EpisodeRepository();
const ocjenaRepository: IOcjenaRepository = new OcjenaRepository();
const triviaRepository: ITriviaRepository = new TriviaRepository();
// Services
const authService: IAuthService = new AuthService(userRepository);
const userService: IUserService = new UserService(userRepository);
const contentService: IContentService = new ContentService(contentRepository, triviaRepository, episodeRepository);
const episodeService: IEpisodeService = new EpisodeService(episodeRepository);
const ocjenaService: IOcjenaService = new OcjenaService(ocjenaRepository);

// WebAPI routes
const authController = new AuthController(authService);
const userController = new UserController(userService);
const contentController = new ContentController(contentService, ocjenaService);
const episodeController = new EpisodeController(episodeService);
const ocjenaController = new RatingController(ocjenaService);
const adminController = new AdminController(contentService as ContentService);
// Registering routes
app.use('/api/v1', authController.getRouter());
app.use('/api/v1', userController.getRouter());
app.use('/api/v1', contentController.getRouter());
app.use('/api/v1', episodeController.getRouter());
app.use('/api/v1', ocjenaController.getRouter());
app.use('/api/v1', adminController.getRouter());

app.post('/api/v1/test-validation', validateContent, (req: Request, res: Response) => {
    res.json({success: true, message: "Podaci su validni", data: req.body});
});


export default app; 

