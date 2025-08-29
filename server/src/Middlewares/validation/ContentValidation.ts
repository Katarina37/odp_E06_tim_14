import {Request, Response, NextFunction} from "express"

export const validateContent = (req: Request, res: Response, next: NextFunction) => {
    const {content, trivia, epizode} = req.body;

    if(!content){
        return res.status(400).json({success:false, message:"Content objekat je obavezan"});
    }

    if(!content.naziv || content.naziv.trim().length === 0){
        return res.status(400).json({success:false, message:"Naziv je obavezan"});
    }

    if(!content.tip || !['film', 'serija'].includes(content.tip)){
        return res.status(400).json({success:false, message:"Tip mora biti film ili serija"});
    }

    if(!content.opis || content.opis.trim().length === 0){
        return res.status(400).json({success:false, message:"Opis je obavezan"});        
    }

    if(content.datum_izlaska){
        const datum = new Date(content.datum_izlaska);
        if(isNaN(datum.getTime())){
            return res.status(400).json({success:false, message:"Datum izlaska nije validan"});
        }
    }

    if(trivia && !Array.isArray(trivia)){
        return res.status(400).json({success:false, message:"Trivia mora biti niz"});
    }

    if(trivia){
        for(const triviaItem of trivia){
            if(typeof triviaItem !== 'string' || triviaItem.trim().length === 0){
                return res.status(400).json({success:false, message:"Sve trivia stavke moraju biti neprazni stringovi."});
            }
        }
    }

    if(content.tip === 'serija'){
        if(!epizode || !Array.isArray(epizode)){
            return res.status(400).json({success:false, message:"Epizode su obavezne za serije"});
        }
        if(epizode.length === 0){
            return res.status(400).json({success:false, message:"Serija mora imati bar jednu epizodu"});
        }

        for(const epizoda of epizode){
            if(!epizoda.naziv_epizode || epizoda.naziv_epizode.trim().length === 0){
                return res.status(400).json({success:false, message:"Sve epizode moraju imati naziv"});
            }

            if(!epizoda.opis_epizode || epizoda.opis_epizode.trim().length === 0){
                return res.status(400).json({success:false, message:"Sve epizode moraju imati opis"});
            }

            if(!epizoda.sezona || epizoda.sezona < 1){
                return res.status(400).json({success:false, message:"Sve epizode moraju imati validan broj sezone"});
            }

            if(!epizoda.broj_epizode || epizoda.broj_epizode < 1){
                return res.status(400).json({success:false, message:"Sve epizode moraju imati validan broj epizode"});
            }
        }
    }
    next();
};