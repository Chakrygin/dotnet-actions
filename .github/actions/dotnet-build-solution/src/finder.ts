
import * as glob from '@actions/glob'

import * as path from 'path'

export async function findSolution(patterns: string) {
  const solutions = await find(patterns);

  if (solutions.length == 0) {
    throw new Error('No solution found.');
  }

  const s = solutions.length > 1 ? 's' : '';
  console.log(`Solution${s}:`);

  for (const solution of solutions) {
    console.log(`    ${solution}`);
  }

  console.log();

  if (solutions.length > 1) {
    throw new Error('Multiple solutions found.');
  }

  return solutions[0];
}

async function find(patterns: string) {
  const globber = await glob.create(patterns);
  const files = await globber.glob();

  return files.map(file => {
    return path.relative(process.cwd(), file);
  });
}
