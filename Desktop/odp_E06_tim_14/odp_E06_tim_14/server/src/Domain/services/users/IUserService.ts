import { UserDto } from "../../DTOs/users/UserDto";

export interface IUserService {
    /**
     * @returns
     */
    getSviKorisnici(): Promise<UserDto[]>;
}