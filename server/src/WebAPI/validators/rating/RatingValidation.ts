import { RezultatValidacije } from "../../../Domain/types/ValidationResult";

export function validacijaOcjene(ocjena?: number) : RezultatValidacije{
    if(!ocjena) {
        return { uspjesno: false, poruka: "Morate unijeti ocjenu"};
    }

    if(ocjena < 1 || ocjena > 10){
        return { uspjesno: false, poruka: "Ocjena mora biti u opsegu 1-10"};
    }

    return { uspjesno: true};
}

