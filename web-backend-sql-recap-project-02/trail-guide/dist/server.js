// server.js only calls listen. 
// It’s optional, but it keeps the app easy to test.
import app from './app.js';
// COMMON.JS SYNTAX
// const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Trail Guide running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map