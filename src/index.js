const app = require('./app');


const main = async () => {
    await app.listen(3000);
    console.log("server on port 3000");
  };
  
  main();
 