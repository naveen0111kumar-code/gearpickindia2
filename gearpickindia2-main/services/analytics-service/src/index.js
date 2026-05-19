import express from 'express'; const app = express(); app.get('/health',(_,r)=>r.json({ok:true,service:'analytics-service'})); app.listen(4102);
