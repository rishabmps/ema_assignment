'use server';

/**
 * @fileOverview A flow that enforces company policies on expenses and flags out-of-policy expenses for review.
 *
 * - enforcePolicyCompliance - A function that checks an expense against company policies and flags it if it's out of compliance.
 * - EnforcePolicyComplianceInput - The input type for the enforcePolicyCompliance function.
 * - EnforcePolicyComplianceOutput - The return type for the enforcePolicyCompliance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnforcePolicyComplianceInputSchema = z.object({
  expenseDetails: z.string().describe('Details of the expense, including amount, date, merchant, and category.'),
  policyRules: z.string().describe('Company policy rules in a text format.'),
});

export type EnforcePolicyComplianceInput = z.infer<typeof EnforcePolicyComplianceInputSchema>;

const EnforcePolicyComplianceOutputSchema = z.object({
  isCompliant: z.boolean().describe('Whether the expense complies with company policy.'),
  policyViolations: z.array(z.string()).describe('List of policy violations, if any.'),
  justification: z.string().optional().describe('Justification provided by the user, if any.'),
});

export type EnforcePolicyComplianceOutput = z.infer<typeof EnforcePolicyComplianceOutputSchema>;

export async function enforcePolicyCompliance(input: EnforcePolicyComplianceInput): Promise<EnforcePolicyComplianceOutput> {
  return enforcePolicyComplianceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enforcePolicyCompliancePrompt',
  input: {schema: EnforcePolicyComplianceInputSchema},
  output: {schema: EnforcePolicyComplianceOutputSchema},
  prompt: `You are an AI agent specializing in enforcing company expense policies.

You will receive expense details and company policy rules. Your task is to determine whether the expense complies with the policy.

Expense Details: {{{expenseDetails}}}

Policy Rules: {{{policyRules}}}

Determine if the expense is compliant with the policy rules. If there are any violations, list them in the policyViolations field.
If the expense is not compliant, but there is a justification provided, include it in the justification field.

Return the results in a JSON format:
{
  "isCompliant": true/false,
  "policyViolations": ["Violation 1", "Violation 2", ...],
  "justification": "Justification for the expense"
}
`,
});

const enforcePolicyComplianceFlow = ai.defineFlow(
  {
    name: 'enforcePolicyComplianceFlow',
    inputSchema: EnforcePolicyComplianceInputSchema,
    outputSchema: EnforcePolicyComplianceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
