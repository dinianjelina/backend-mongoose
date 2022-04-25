const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/mongoose');

dotenv.config({ path: 'config/.env' });

connectDatabase();

app.listen(process.env.PORT, () => console.log(`Server: ${process.env.PORT}`));
