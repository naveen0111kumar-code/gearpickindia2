import { runAutonomousLoop } from '../../../agents/core/orchestrator.js';
export const startLoop = () => setInterval(() => runAutonomousLoop(), 60000);
