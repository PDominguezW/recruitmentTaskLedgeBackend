export default function (app) {

  app.use('/contadorVis', {
    async find() {
      try {
        // Get current number of visits
        const client = app.get('mongodbClient');
        const db = client.db('contadorVis');
        const collection = db.collection('contador');
        const result = await collection.findOne({});
        const visitas = result.visitas;
        return visitas;
        
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Error en el servidor');
      } finally {
      }
    },
    async create(data) {
      try {
        // Increment the number of visits by 1
        const client = app.get('mongodbClient');
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
