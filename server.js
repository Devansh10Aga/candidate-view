const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const candidates = [
  { id: 1, name: "John Doe", skills: ["React", "Node.js", "TypeScript"], yearsOfExperience: 5 },
  { id: 2, name: "Jane Smith", skills: ["Python", "Django", "AWS"], yearsOfExperience: 3 },
  { id: 3, name: "Mike Johnson", skills: ["Java", "Spring", "MySQL"], yearsOfExperience: 7 },
  { id: 4, name: "Sarah Williams", skills: ["Angular", "MongoDB", "Express"], yearsOfExperience: 4 },
  { id: 5, name: "David Brown", skills: ["Vue.js", "PHP", "Laravel"], yearsOfExperience: 6 }
];

app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));