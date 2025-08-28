import { Ocjena } from "../../Domain/models/Ocjena";
import { OcjenaDto } from "../../Domain/DTOs/ratings/OcjenaDto";
import { IOcjenaRepository } from "../../Domain/repositories/ratings/IOcjenaRepository";
import { IOcjenaService } from "../../Domain/services/ratings/IOcjenaService";


export class OcjenaService implements IOcjenaService {
    public constructor(private ocjenaRepository: IOcjenaRepository) {}

    async getByContentAndUser(content_id: number, user_id: number): Promise<OcjenaDto | null> {
        try {
            const result: Ocjena | null = await this.ocjenaRepository.getByContentAndUser(content_id, user_id);

            if(!result){
            return null;
           }
            const resDto: OcjenaDto = new OcjenaDto(result.rating_id, result.content_id, result.user_id, result.ocjena);

            return resDto;
        } catch (err) {
            console.error(err);
            return new OcjenaDto();
        }
    }

    async addOcjena(content_id: number, user_id: number, ocjena: number): Promise<OcjenaDto> {
        try {
            const postoji: Ocjena | null = await this.ocjenaRepository.getByContentAndUser(content_id, user_id);

            if(postoji) {
            throw new Error("Vec ste ocijenili ovaj sadrzaj");
            }

            const ocjenaNova: Ocjena = await this.ocjenaRepository.create(new Ocjena(0, content_id, user_id, ocjena));

            const ocjenaDto: OcjenaDto = new OcjenaDto(ocjenaNova.rating_id, ocjenaNova.content_id, ocjenaNova.user_id, ocjenaNova.ocjena);

            return ocjenaDto;
        } catch (err) {
            console.error(err);
            return new OcjenaDto();
        }
    }

    async updateOcjena(content_id: number, user_id: number, ocjena: number): Promise<OcjenaDto> {
        try {
            const postoji: Ocjena | null = await this.ocjenaRepository.getByContentAndUser(content_id, user_id);

            if(!postoji){
                throw new Error("Niste ocijenili sadrzaj");
            }

            postoji.ocjena = ocjena;

            const ocjenaUpdate: Ocjena = await this.ocjenaRepository.updateOcjena(postoji);

            const ocjenaDto: OcjenaDto = new OcjenaDto(ocjenaUpdate.rating_id, ocjenaUpdate.content_id, ocjenaUpdate.user_id, ocjenaUpdate.ocjena);

            return ocjenaDto;
        } catch (err) {
            console.error(err);
            return new OcjenaDto();
        }
    }
}