const cookieOption = {
  httpOnly: true, // JS cannot read it (XSS safe)
  secure: true, // MUST be true in production (HTTPS)
  sameSite: "none", // REQUIRED for frontend & backend on different domains
  maxAge: 15 * 60 * 1000, // 15 minutes
};

export default cookieOption;
