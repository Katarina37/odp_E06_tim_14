export class UserDto {
    public constructor(
       public user_id: number = 0,
       public username: string = "",
       public lozinka: string = "",
       public uloga: string = "korisnik",
    ){}
}