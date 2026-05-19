export const generateContent = async (plan) => ({ drafts: plan.keywords.map((k) => `Draft for ${k}`) });
