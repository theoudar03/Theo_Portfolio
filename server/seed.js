const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');

const projectsData = [
  {
    title: 'Mini Calculator',
    description: 'A simple yet functional calculator web application capable of performing basic arithmetic operations with a clean user interface.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubLink: 'https://github.com/yourusername/calculator',
    liveLink: 'https://calculator-demo.com',
    category: 'Web',
    featured: true,
    image: '/uploads/projects/Calculator.png',
    order: 3
  },
  {
    title: 'Personal Portfolio',
    description: 'A fully responsive and modern personal portfolio website designed to showcase skills, experience, and projects. Built with performance and aesthetics in mind.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubLink: 'https://github.com/yourusername/portfolio',
    liveLink: 'https://portfolio-demo.com',
    category: 'Web',
    featured: true,
    image: '/uploads/projects/portfolio.png',
    order: 1
  },
  {
    title: 'StayOnTrack - Dropout Predictor',
    description: 'An AI-powered system designed to predict student dropout risks using Machine Learning models. It integrates a python backend with a web interface.',
    technologies: ['Python', 'Machine Learning', 'Web Integration'],
    githubLink: 'https://github.com/yourusername/stayontrack',
    liveLink: 'https://stayontrack-demo.com',
    category: 'ML',
    featured: true,
    image: '/uploads/projects/dropout_predictor.png',
    order: 2
  }
];

const skillsData = [
  // Technical Skills
  { name: 'HTML', category: 'Technical Skill', level: 'Experienced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', order: 1 },
  { name: 'CSS', category: 'Technical Skill', level: 'Experienced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', order: 2 },
  { name: 'JavaScript', category: 'Technical Skill', level: 'Experienced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', order: 3 },
  { name: 'React', category: 'Technical Skill', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', order: 4 },
  { name: 'Node.js', category: 'Technical Skill', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', order: 5 },
  { name: 'Express', category: 'Technical Skill', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', order: 6 },
  { name: 'MongoDB', category: 'Technical Skill', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', order: 7 },
  { name: 'Java', category: 'Technical Skill', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', order: 8 },
  { name: 'Python', category: 'Technical Skill', level: 'Basics', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', order: 9 },
  { name: 'Spring Boot', category: 'Technical Skill', level: 'Basics', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', order: 10 },
  
  // Tools
  { name: 'Git', category: 'Tool', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', order: 1 },
  { name: 'GitHub', category: 'Tool', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', order: 2 },
  { name: 'VS Code', category: 'Tool', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', order: 3 },
  { name: 'Postman', category: 'Tool', iconUrl: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', order: 4 },
  { name: 'MongoDB Atlas', category: 'Tool', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', order: 5 },
  { name: 'ChatGPT/AI', category: 'Tool', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', order: 6 },
  { name: 'Deployment', category: 'Tool', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', order: 7 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Project.insertMany(projectsData);
    await Skill.insertMany(skillsData);
    
    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
