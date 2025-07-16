const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/user').default;
const medicalRoutes = require('./routes/medical').default;
const sosRoutes = require('./routes/sos').default;
const paymentRoutes = require('./routes/payment').default;
const loyaltyRoutes = require('./routes/loyalty').default;

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/medical', medicalRoutes);
app.use('/sos', sosRoutes);
app.use('/payment', paymentRoutes);
app.use('/loyalty', loyaltyRoutes);

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});