import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a response for the Dorm AI Assistant.
 * Handles FAQ and general queries about campus life.
 */
export const getDormAssistantResponse = async (
  query: string, 
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct the context for the model
    const systemInstruction = `
      You are "UniBot", a helpful and friendly Dorm Management Assistant for a university.
      
      Your knowledge base includes:
      - WiFi: Network is 'UniLife_Secure', password is 'LearnGrow2024'.
      - Quiet Hours: 10 PM to 8 AM on weekdays, Midnight to 9 AM on weekends.
      - Guests: Must be signed in at the front desk and leave by midnight on weekdays.
      - Laundry: Located in the basement, requires Student ID card.
      - Mail: Packages can be picked up at the front desk between 9 AM and 5 PM.
      - Emergency: Call Campus Safety at 555-0199.
      
      If a student asks about something outside this list, give a helpful, generic university-appropriate answer or suggest contacting the RA (Resident Advisor).
      Keep answers concise and friendly.
    `;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history as any, // Cast to any to bypass strict type check for demo purposes if needed, though structure matches
    });

    const result = await chat.sendMessage({ message: query });
    return result.text || "I'm sorry, I couldn't process that request right now.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the network. Please try again later.";
  }
};

/**
 * Drafts a formal issue report message to the manager.
 */
export const draftIssueReport = async (issueDetails: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a polite and concise message to a Dorm Manager reporting the following issue: "${issueDetails}". 
      Include placeholders for Room Number if not implied. sign it as "A Concerned Student".`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Issue: ${issueDetails}`;
  }
};
