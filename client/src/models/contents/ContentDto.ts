export interface ContentDto {
    content_id: number;
    naziv: string;
    tip: string;
    opis: string;
    datum_izlaska: string;
    cover_slika: string;
    zanr: string;
    prosjecna_ocjena?: number;
    trivia_opis?: string[];
}