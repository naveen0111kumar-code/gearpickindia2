import express from 'express'; const app = express(); app.get('/health',(_,r)=>r.json({ok:true,service:'billing-service',provider:'stripe-mock'})); app.listen(4103);
