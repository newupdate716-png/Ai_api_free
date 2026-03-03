export default async function handler(req, res) {
    try {
        const { prompt } = req.query;

        if (!prompt) {
            return res.status(400).json({
                status: false,
                message: "Prompt query is required!",
                example: "/api?prompt=hello",
                credit: "@sakib01994",
                group: "@sakib_api"
            });
        }

        // Call your main API
        const response = await fetch(
            `https://r-gengpt-api.vercel.app/api?prompt=${encodeURIComponent(prompt)}`
        );

        const data = await response.json();

        return res.status(200).json({
            status: true,
            prompt: prompt,
            result: data,
            credit: "@sakib01994",
            group: "@sakib_api"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong!",
            error: error.message,
            credit: "@sakib01994",
            group: "@sakib_api"
        });
    }
}
