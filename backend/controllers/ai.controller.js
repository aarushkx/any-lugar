import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateSuggestions = asyncHandler(async (req, res) => {
    const { destination, traveller, budget, description } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
                    You are a travel assistant tasked with analyzing the following data: destination, number of travelers, budget (in Indian Rupees ₹), and description of the place. Based on this information, provide a JSON response that includes the following fields:
                    - 'best_places_to_visit': An array of objects representing recommended places to visit, each with the attributes: 'name', 'budget', and 'description'.
                    - 'accommodations': An array of objects representing suggested places to stay, each with the attributes: 'name', 'budget', and 'description'.
                    - 'things_to_do': An array of objects representing activities or experiences, each with the attributes: 'name', 'budget', and 'description'.
                    
                    Ensure the output is formatted strictly in JSON and includes only these fields. Do not include any additional text or explanations in any scenario whatsoever.

                    Here is the input data: destination: ${destination}, number of travelers: ${traveller}, budget: ${budget}, description: ${description}.
                    `;

    const result = await model.generateContent(prompt, { maxTokens: 100 });
    
    return res.status(200).json({ result: result.response.text() });
});
