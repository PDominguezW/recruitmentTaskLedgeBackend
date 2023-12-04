import { MongoClient } from 'mongodb';

export default function (app) {
  const connectionString = app.get('mongodb');
  const client = new MongoClient(connectionString, {});

  app.use('/contadorVis', {
    async find() {
      try {
        await client.connect();
        
        // Get current number of visits
        const db = client.db('contadorVis');
        const collection = db.collection('contador');
        const result = await collection.findOne({});
        const visitas = result.visitas;
        return visitas;
        
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Error en el servidor');
      } finally {
        await client.close();
      }
    },
    async create(data) {
      try {
        await client.connect();
        
        // Increment the number of visits by 1
        const db = client.db('contadorVis');
        const collection = db.collection('contador');
        const result = await collection.findOneAndUpdate(
          {},
          { $inc: { visitas: 1 } },
          { returnDocument: 'after' }
        );

        // Return the updated number of visits
        return result.visitas;

      } catch (error) {
        console.error('Error:', error);
        throw new Error('Error en el servidor');
      } finally {
        await client.close();
      }
    },
  });

  // Add other service methods like update, remove as needed

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
