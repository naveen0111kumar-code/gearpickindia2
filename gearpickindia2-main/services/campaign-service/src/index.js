import express from 'express'; const app = express(); app.get('/health',(_,r)=>r.json({ok:true,service:'campaign-service'})); app.listen(4101);
