import express from 'express';

const app = express();

app.get('/api', (req, res) => {
    return res.send('Olá mundo');
});

const port = 3333;
app.listen(port, () => {
  console.log();
  console.log(`Server is running in port ${port}!`)
})
