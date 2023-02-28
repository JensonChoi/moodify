const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.generateImg = async (req, res) => {
    const { mood } = req.body
    res = openai.Image.create(
        prompt=mood,
        n=1,
        size="1024x1024"
    )
    //image_url = response['data'][0]['url']
  }