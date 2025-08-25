export class ContentDto {
    public constructor(
        public content_id: number = 0,
        public naziv: string = "",
        public tip: string = "film",
        public opis: string = "",
        public datum_izlaska: Date = new Date(),
        public cover_slika: string = "",
        public zanr: string = "",
        public prosjecna_ocjena?: number,
    ){}
}