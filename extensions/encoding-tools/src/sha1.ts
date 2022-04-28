import { entrypoint, getInput, setOutput } from "../lib/utils";
import { createHash } from "crypto";

/**
 * SHA1 hash.
 *
 * @author eth-p
 */
export default entrypoint(async () => {
  const contents = await getInput();
  const hash = createHash("sha1");
  hash.write(contents);

  const output = hash.digest().toString("hex");
  await setOutput(output, "Created SHA1 Hash");
});
