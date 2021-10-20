const app = require('./app');


const main = async () => {
    await app.listen(5000);
    console.log("server on port 5000");
  };
  
  main();
 