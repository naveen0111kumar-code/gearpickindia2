import { detectTrends } from '../modules/trendAgent.js';
import { buildSeoPlan } from '../modules/seoAgent.js';
import { generateContent } from '../modules/contentAgent.js';
import { runAds } from '../modules/adsAgent.js';
import { analyzePerformance } from '../modules/analyticsAgent.js';

export async function runAutonomousLoop() {
  const trends = await detectTrends();
  const strategy = await buildSeoPlan(trends);
  const content = await generateContent(strategy);
  const traffic = await runAds(content);
  const revenue = await analyzePerformance(traffic);
  return { trends, strategy, content, traffic, revenue, reinvestmentBudget: Math.round(revenue.revenue * 0.3) };
}
