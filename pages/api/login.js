import cookie from "cookie";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { username, password } = req.body;
    if (
      username == process.env.Admin_username &&
      password == process.env.Admin_password
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", process.env.token, {
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  }
};

export default handler;
