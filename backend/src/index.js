import server from './server';
import Mongoose from './server/db';

const options = {
  port: process.env.HTTP_PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  uploads: {
    maxFieldSize: 8388608, // unit bytes // 2M x 4 (maxFiles)
    maxFileSize: 2097152, // unit bytes // size 2M
    maxFiles: 4
  }
}

if(process.env.NODE_ENV === 'production') {
  options.playground = false;
}

Mongoose.connection.once("open", function(){
  server.start(options, ({ port }) => {
    console.log(`🚀 server is running on localhost:${port}`)
  })
});
