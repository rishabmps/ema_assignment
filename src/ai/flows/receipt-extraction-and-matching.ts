'use server';
/**
 * @fileOverview An AI agent for receipt extraction and matching to transactions.
 *
 * - receiptExtractionAndMatching - A function that handles the receipt extraction and matching process.
 * - ReceiptExtractionAndMatchingInput - The input type for the receiptExtractionAndMatching function.
 * - ReceiptExtractionAndMatchingOutput - The return type for the receiptExtractionAndMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReceiptExtractionAndMatchingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  transactionDetails: z.string().describe('The details of the transaction.'),
});
export type ReceiptExtractionAndMatchingInput = z.infer<typeof ReceiptExtractionAndMatchingInputSchema>;

const ReceiptExtractionAndMatchingOutputSchema = z.object({
  merchant: z.string().describe('The merchant name extracted from the receipt.'),
  date: z.string().describe('The date extracted from the receipt.'),
  amount: z.number().describe('The amount extracted from the receipt.'),
  matched: z.boolean().describe('Whether the receipt was matched to the transaction details.'),
});
export type ReceiptExtractionAndMatchingOutput = z.infer<typeof ReceiptExtractionAndMatchingOutputSchema>;

export async function receiptExtractionAndMatching(input: ReceiptExtractionAndMatchingInput): Promise<ReceiptExtractionAndMatchingOutput> {
  return receiptExtractionAndMatchingFlow(input);
}

const receiptExtractionAndMatchingPrompt = ai.definePrompt({
  name: 'receiptExtractionAndMatchingPrompt',
  input: {schema: ReceiptExtractionAndMatchingInputSchema},
  output: {schema: ReceiptExtractionAndMatchingOutputSchema},
  prompt: `You are an AI assistant that extracts information from a receipt and matches it to transaction details.

  Extract the merchant, date, and amount from the receipt image.

  Receipt Image: {{media url=photoDataUri}}
  Transaction Details: {{{transactionDetails}}}

  Determine if the receipt matches the transaction details.
  `,
});

const receiptExtractionAndMatchingFlow = ai.defineFlow(
  {
    name: 'receiptExtractionAndMatchingFlow',
    inputSchema: ReceiptExtractionAndMatchingInputSchema,
    outputSchema: ReceiptExtractionAndMatchingOutputSchema,
  },
  async input => {
    const {output} = await receiptExtractionAndMatchingPrompt(input);
    return output!;
  }
);
