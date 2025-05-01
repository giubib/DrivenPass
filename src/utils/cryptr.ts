import Cryptr from "cryptr";

if (!process.env.CRYPTR_SECRET) {
  throw new Error("CRYPTR_SECRET environment variable is not set.");
}

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export default cryptr;
