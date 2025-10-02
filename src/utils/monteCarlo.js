// Monte Carlo Simulation Utility

// Generate random number from normal distribution using Box-Muller transform
function randomNormal(mean = 0, stdDev = 1) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

// Run Monte Carlo simulation
export function runMonteCarloSimulation({
  initialAmount,
  monthlyContribution,
  horizonYears,
  expectedReturn, // Annual expected return as percentage (e.g., 8.5)
  standardDeviation, // Annual std dev as percentage (e.g., 15.0)
  scenarios = 1000,
}) {
  const months = horizonYears * 12;

  // Convert annual to monthly
  const monthlyReturn = expectedReturn / 12 / 100;
  const monthlyStdDev = standardDeviation / Math.sqrt(12) / 100;

  const allScenarios = [];

  // Run simulations
  for (let s = 0; s < scenarios; s++) {
    const scenario = [];
    let value = initialAmount;

    for (let month = 0; month <= months; month++) {
      // Add monthly contribution (except first month which is initial amount)
      if (month > 0) {
        value += monthlyContribution;
      }

      // Apply random return
      if (month > 0) {
        const monthReturn = randomNormal(monthlyReturn, monthlyStdDev);
        value *= (1 + monthReturn);
      }

      scenario.push({
        month,
        value: Math.max(0, value), // Ensure non-negative
      });
    }

    allScenarios.push(scenario);
  }

  // Calculate percentiles for each month
  const result = [];
  for (let month = 0; month <= months; month++) {
    const valuesAtMonth = allScenarios.map((s) => s[month].value).sort((a, b) => a - b);

    const p10Index = Math.floor(scenarios * 0.1);
    const p50Index = Math.floor(scenarios * 0.5);
    const p90Index = Math.floor(scenarios * 0.9);

    result.push({
      month,
      year: (month / 12).toFixed(1),
      p10: valuesAtMonth[p10Index],
      median: valuesAtMonth[p50Index],
      p90: valuesAtMonth[p90Index],
      invested: initialAmount + (monthlyContribution * month),
    });
  }

  return result;
}

// Calculate expected final values
export function calculateExpectedValues(simulationResults) {
  const final = simulationResults[simulationResults.length - 1];

  return {
    pessimistic: final.p10,
    expected: final.median,
    optimistic: final.p90,
    invested: final.invested,
  };
}
