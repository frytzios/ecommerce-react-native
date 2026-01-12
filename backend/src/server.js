import express from 'express';

const app = express();

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Succes" });
});

app.listen(3000, () => console.log('El servidor esta corriendo en http://localhost:3000'));
