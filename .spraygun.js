const path = require("path");

exports.setup = (projectDirectory, { chalk, shell }) => {
  const appPath = path.resolve(projectDirectory);
  const appName = path.basename(projectDirectory);

  const nodeVersion = process.versions.node;
  const yarnVersion = shell
    .exec("yarn --version", { silent: true })
    .stdout.trim();

  const replacements = [
    [/app-prototype/g, appName, "Dockerfile"],
    [/app-prototype/g, appName, "README.md"],
    [/app-prototype/g, appName, "package.json"],
    [/"node": "\d+\.\d+\.\d+"/, `"node": "${nodeVersion}"`, "package.json"],
    [/node:\d+\.\d+\.\d+/, `node:${nodeVersion}`, "Dockerfile"],
    [/node:\d+\.\d+\.\d+/, `node:${nodeVersion}`, ".circleci/config.yml"],
    [/Node \d+\.\d+\.\d+/gi, `Node ${nodeVersion}`, "README.md"],
    [/"yarn": "\d+\.\d+\.\d+"/, `"yarn": "${yarnVersion}"`, "package.json"],
    [/yarn@\d+\.\d+\.\d+/, `yarn@${yarnVersion}`, "Dockerfile"],
    [
      /YARN_VERSION=\d+\.\d+\.\d+/,
      `YARN_VERSION=${yarnVersion}`,
      ".circleci/config.yml"
    ],
    [/Yarn \d+\.\d+\.\d+/gi, `Yarn ${yarnVersion}`, "README.md"]
  ];

  shell.cd(projectDirectory);
  replacements.forEach(r => shell.sed("-i", ...r));
  shell.rm("-rf", "node_modules");
  shell.rm("-rf", ".git");
  shell.exec("git init -q");
  shell.exec("yarn install");
  shell.rm("-rf", ".spraygun.js");
  shell.exec("git add -A .");
  shell.exec("git commit -n -q -m 'Init from spraygun template'");

  console.log(
    chalk`
  {green Success!} Created ${appName} at ${appPath}
  Your new Express app contains several commands:

    {cyan yarn dev}
      Starts the Express server with auto-reloading

    {cyan yarn test}
      Starts the test runner

    {cyan yarn lint}
      Runs lint checks

    {cyan yarn start}
      Runs the Express server (suitable for production)

  Your app is deployable to Heroku and can build on Circle CI out of the box.
  In addition, a sample Dockerfile is provided should you care to use it.

  We suggest that you begin by typing:

    {cyan cd} ${projectDirectory}
    {cyan yarn dev}

  Enjoy your Carbon Five flavored Express application!
`
  );
};
