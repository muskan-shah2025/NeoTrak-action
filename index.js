const core = require('@actions/core');
const path = require("path");
const fs = require("fs");
const { createBom } = require("@cyclonedx/cdxgen");

async function run() {
  try {
    const username = core.getInput('username');
    const password = core.getInput('password');
    core.info(`✅ Login attempt for user: ${username}`);

    const target = path.resolve("."); // default to current directory
    core.info(`📂 Resolved target path: ${target}`);

    if (!fs.existsSync(path.join(target, "pom.xml"))) {
      throw new Error("pom.xml not found in target directory.");
    }

    core.info("📦 Found pom.xml, generating SBOM...");

    const bom = await createBom(target, {
      multiProject: false,
      installDeps: false,
      deep: true,
      outputFormat: "json"
    });

    const outputPath = path.resolve("sbom.json");
    fs.writeFileSync(outputPath, JSON.stringify(bom, null, 2));
    core.info(`✅ SBOM generated at: ${outputPath}`);
  } catch (error) {
    core.setFailed(`❌ Action failed: ${error.message}`);
  }
}

run();
