export class User {
  public constructor(
    public user_id: number = 0,
    public username: string = '',
    public uloga: string = 'korisnik',
    public lozinka: string = ''
  ) {}
}