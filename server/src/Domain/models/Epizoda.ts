export class Epizoda{
    public constructor(
        public episode_id: number = 0,
        public content_id: number = 0,
        public sezona: number = 0,
        public broj_epizode: number = 0,
        public naziv_epizode: string = '',
        public opis_epizode: number = 0,
        public cover_slika: string = ''
    ){}
}