const {Service: ServiceModel, Service} = require('../models/Service');

const serviceController = {

    create: async(req, res) => {
        try{

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };

            const response = await ServiceModel.create(service);

            res.status(201).json({ response, message: 'Serviço criado com sucesso.' });

        } catch (error){
            console.log(`Erro:`, error);
        }
    },
    getAll: async(req, res) => {
        try{

            const service = await ServiceModel.find();

            res.json(service);

        } catch (error){
            console.log(`Erro:`, error);
        }
    },
    get: async(req, res) => {
        try {

            const id = req.params.id
            const service = await ServiceModel.findById(id)

            if(!service){
                res.status(404).json({ message: 'Serviço não encontrado.'})
                return;
            }

            res.json(service);
            
        } catch (error) {
            console.log('Erro:', error)
        }
    },
    delete: async(req, res) => {
        try {
            
            const id = req.params.id
            const service = await ServiceModel.findById(id)

            if(!service){
                res.status(404).json({ message: 'Serviço não encontrado.'})
                return;
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id)

            res.status(200).json({deletedService, message: 'Serviço excluído com sucesso.'})
        } catch (error) {
            console.log('Erro:', error)
        }
    },
    update: async(req, res) => {
        try {
            
            const id = req.params.id;
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };
            
            const updateService = await ServiceModel.findByIdAndUpdate(id, service);

            if(!updateService){
                res.status(404).json({ message: 'Serviço não encontrado'});
                return;
            }

            res.status(200).json({service, message: 'Serviço atualizado com sucesso'});

        } catch (error) {
            console.log('Erro:', error)
        }
    }

}

module.exports = serviceController;