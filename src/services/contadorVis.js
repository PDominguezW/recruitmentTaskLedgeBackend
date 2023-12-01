import { MongoClient } from 'mongodb';

export default function (app) {
  const connectionString = app.get('mongodb');
  const client = new MongoClient(connectionString, {});

  app.use('/contadorVis', {
    async find() {
      try {
        await client.connect();
        
        // Get current number of visits and then increment it
        const db = client.db('contadorVis');
        const collection = db.collection('contador');

        // Get the only document in the collection
        const result = await collection.findOne({});
        
        // Get the attribute "visitas", return it and increment it by 1
        const visitas = result.visitas;
        await collection.updateOne({}, { $set: { visitas: visitas + 1 } });

        return visitas;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Error en el servidor');
      }finally {
        await client.close();
      }
    },
  });

  // Add other service methods like create, update, remove as needed

  // Get the wrapped service object, initialize our service
  const service = app.service('contadorVis');

  // Set up event listeners here if needed

  service.hooks({
    // Hooks for the 'contadorTarea' service
    before: {},
    after: {},
    error: {},
  });
}