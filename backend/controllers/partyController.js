const PartyModel = require('../models/Party')

const checkPartyBudget = (budget, services) => {

    const priceSum = services.reduce((sum, services) => sum + services.price, 0)

    if(priceSum > budget) {
        return false;  
    }

    return true;

}

const partyController = {
    create: async(req, res) => {

        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            }

            if(party.services && !checkPartyBudget(party.budget, party.services)) {

                res.status(406).json({ msg: "Seu orçamento é insuficiente."})
                return;

            }

            const response = await PartyModel.create(party)

            res.status(201).json({ response, message: 'Festa criada com sucesso!' })
            
        } catch (error) {
            console.log('Erro:', error);
        }
    },
    getAll: async(req, res) => {
        try{

            const parties = await PartyModel.find();

            res.json(parties);

        } catch (error){
            console.log(`Erro:`, error);
        }
    },
    get: async(req, res) => {
        try {
            const id = req.params.id;

            const party = await PartyModel.findById(id);

            if(!party) {
                res.status(404).json({ message: 'Festa não encontrada'});
                return;
            }

            res.json(party);

        } catch (error) {
            console.log('Erro:', error)
        }
    },
    delete: async(req, res) => {
        try {
            
            const id = req.params.id;

            const party = await PartyModel.findById(id);

            if(!party) {
                res.status(404).json({msg: 'Festa não encontrada'});
                return;
            }

            const deletedParty = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({ deletedParty, message: 'Festa excluída com sucesso.'})

        } catch (error) {
            console.log('Erro:', error)
        }
    },
    update: async(req, res) => {
        try {

            const id = req.params.id

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            if(party.services && !checkPartyBudget(party.budget, party.services)) {

                res.status(406).json({ msg: "Seu orçamento é insuficiente."})
                return;

            }

            const updateParty = await PartyModel.findByIdAndUpdate(id, party)

            if(!updateParty) {
                res.status(404).json({msg: 'Festa não encontrada'});
                return;
            }

            res.status(200).json({party, message: 'Festa atualizada com sucesso.'})
            
        } catch (error) {
            console.log('Erro', error)
        }
    }
}

module.exports = partyController;