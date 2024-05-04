export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { method } = req;
  
    switch (method) {
      case "GET":
        try {
          // Simulating an asynchronous operation
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return res.status(200).json({ success: true, message: "Hello World" });
        } catch (error) {
          return res.status(400).json({ success: false, error: error.message });
        }
      default:
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  }
  