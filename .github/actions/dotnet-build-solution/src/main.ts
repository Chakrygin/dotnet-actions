import * as core from '@actions/core'

import * as dotnet from './dotnet'
import * as finder from './finder'

async function main() {
  try {

    const configuration = core.getInput('CONFIGURATION');

    const solutionPattern = core.getInput('SOLUTION');
    const solution = await finder.findSolution(solutionPattern);

    await core.group(`Restoring "${solution}"...`, async () => {
      await dotnet.restore(solution, {
        packages: 'packages',
      });

      console.log();
    });

    await core.group(`Building "${solution}"...`, async () => {
      await dotnet.build(solution, {
        configuration: configuration,
      });

      console.log();
    });

  }
  catch (error: any) {
    core.setFailed(error.message)
  }
}

main();
