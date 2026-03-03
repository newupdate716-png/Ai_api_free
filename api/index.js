module.exports = async function (req, res) {
    try {
        const prompt = req.query.prompt;

        if (!prompt) {
            return res.status(400).json({
                status: false,
                message: "Prompt query is required!",
                example: "/api?prompt=Hello",
                credit: "@sakib01994",
                group: "@sakib_api"
            });
        }

        const url = "https://r-gengpt-api.vercel.app/api?prompt=" + encodeURIComponent(prompt);

        const response = await fetch(url);

        const text = await response.text(); // text first (safer than json)

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = { reply: text }; // if not JSON, wrap as text
        }

        return res.status(200).json({
            status: true,
            prompt: prompt,
            result: data,
            credit: "@sakib01994",
            group: "@sakib_api"
        });

    } catch (error) {
        return res.status(200).json({
            status: false,
            message: "Main API Error",
            details: error.toString(),
            credit: "@sakib01994",
            group: "@sakib_api"
        });
    }
};
