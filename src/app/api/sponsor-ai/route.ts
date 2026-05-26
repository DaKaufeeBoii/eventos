import { groq } from "@/lib/gemini";

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const {
            eventType,
            audience,
            scale,
        } = body;

        const completion =
            await groq.chat.completions.create({
                model:
                    "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are an expert sponsorship advisor for events. You also do not give responses in multiple paragraphs. You only focus on the most important points. So, only respond with bullet points. The event types, the audience, and the expected scale sections are not to be taken lightly.",
                    },

                    {
                        role: "user",
                        content: `
Suggest:
1. Best sponsor categories
2. Example sponsor companies
3. Outreach strategy

Event Type: ${eventType}
Audience: ${audience}
Scale: ${scale}
                        `,
                    },
                ],
            });

        return Response.json({
            success: true,
            data:
                completion.choices[0]
                    .message.content,
        });

    } catch (error: unknown) {

        console.error(error);

        const message =
            error instanceof Error
                ? error.message
                : "AI request failed";

        return Response.json({
            success: false,
            error: message,
        });
    }
}
