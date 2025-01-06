const { isDataAvailableInTable, insertDataIntoTable,tables } = require('./utility');

// Inserting Dummydata into tables
const insertDummyData=async(pool)=>{
  try { 
    for (const { name, data, columns } of tables) {
      if (await isDataAvailableInTable(pool,name)) {
        console.log(`Data already available in ${name} table.`);
      } else {
        await insertDataIntoTable(pool, name, data, columns);
      }
    }

  } catch (error) {
    console.error('Error connecting to the database or inserting data:', error);
  } 
}

module.exports={insertDummyData,tables};

