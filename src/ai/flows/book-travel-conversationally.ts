'use server';
/**
 * @fileOverview An AI agent that books travel conversationally.
 *
 * - bookTravelConversationally - A function that books travel based on natural language input.
 * - BookTravelConversationallyInput - The input type for the bookTravelConversationally function.
 * - BookTravelConversationallyOutput - The return type for the bookTravelConversationally function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookTravelConversationallyInputSchema = z.object({
  travelRequest: z
    .string()
    .describe('The natural language request for booking travel.'),
});
export type BookTravelConversationallyInput = z.infer<
  typeof BookTravelConversationallyInputSchema
>;

const BookTravelConversationallyOutputSchema = z.object({
  itinerary: z
    .string()
    .describe('The generated travel itinerary based on the request.'),
});
export type BookTravelConversationallyOutput = z.infer<
  typeof BookTravelConversationallyOutputSchema
>;

export async function bookTravelConversationally(
  input: BookTravelConversationallyInput
): Promise<BookTravelConversationallyOutput> {
  return bookTravelConversationallyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bookTravelConversationallyPrompt',
  input: {schema: BookTravelConversationallyInputSchema},
  output: {schema: BookTravelConversationallyOutputSchema},
  prompt: `You are an expert travel agent specializing in booking travel according to company policy.

You will take the user's travel request and generate a travel itinerary that is fully compliant and optimized.

Use the following as the primary source of information about the travel request:

Travel Request: {{{travelRequest}}}`,
});

const bookTravelConversationallyFlow = ai.defineFlow(
  {
    name: 'bookTravelConversationallyFlow',
    inputSchema: BookTravelConversationallyInputSchema,
    outputSchema: BookTravelConversationallyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
