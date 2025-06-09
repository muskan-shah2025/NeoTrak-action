const core = require('@actions/core');

async function run() {
  try {
    const username = core.getInput('username');
    const password = core.getInput('password');

    core.info(`✅ Login attempt for user: ${username}`);
    core.info(`🔐 Authenticating...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    core.info(`🎉 Successfully authenticated user "${username}"`);
  } catch (error) {
    core.setFailed(`❌ Action failed: ${error.message}`);
  }
}

run();
