'use server';

/**
 * @fileOverview A flow to automatically generate expense reports from corporate card transactions.
 *
 * - automateExpenseReport - A function that handles the expense report generation process.
 * - AutomateExpenseReportInput - The input type for the automateExpenseReport function.
 * - AutomateExpenseReportOutput - The return type for the automateExpenseReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateExpenseReportInputSchema = z.object({
  transactionDetails: z.string().describe('Details of the corporate card transaction.'),
  receiptDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userPolicies: z.string().describe('The company policies applicable to the user.'),
});
export type AutomateExpenseReportInput = z.infer<typeof AutomateExpenseReportInputSchema>;

const AutomateExpenseReportOutputSchema = z.object({
  expenseReport: z.string().describe('The generated expense report.'),
  policyCompliance: z.boolean().describe('Whether the expense complies with company policy.'),
  complianceDetails: z.string().optional().describe('Details of any policy violations.'),
});
export type AutomateExpenseReportOutput = z.infer<typeof AutomateExpenseReportOutputSchema>;

export async function automateExpenseReport(input: AutomateExpenseReportInput): Promise<AutomateExpenseReportOutput> {
  return automateExpenseReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automateExpenseReportPrompt',
  input: {schema: AutomateExpenseReportInputSchema},
  output: {schema: AutomateExpenseReportOutputSchema},
  prompt: `You are an AI assistant that generates expense reports from transaction details and receipts, and checks if the expense complies with company policy.

  Transaction Details: {{{transactionDetails}}}
  Policies: {{{userPolicies}}}
  Receipt: {{#if receiptDataUri}}{{media url=receiptDataUri}}{{else}}No receipt provided.{{/if}}

  Generate an expense report and determine policy compliance.
  If there is a receipt, extract key information from the receipt, such as merchant, date, and amount, and add to expense report.
  The expense report must be in a well structured format and be easy to read.
  Return policyCompliance as true if compliant, false otherwise.
  If not compliant, provide details in complianceDetails.`,
});

const automateExpenseReportFlow = ai.defineFlow(
  {
    name: 'automateExpenseReportFlow',
    inputSchema: AutomateExpenseReportInputSchema,
    outputSchema: AutomateExpenseReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
