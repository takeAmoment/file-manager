import { createBrotliCompress } from 'zlib'

import { handleZlipCommand } from './handleZlipCommand.js'

export const compressFile = async (commandArgs) => {
  if (commandArgs.length !== 2) {
    console.error('Invalid input')
    return
  }

  const gzip = createBrotliCompress()
  await handleZlipCommand(commandArgs[0], commandArgs[1], gzip);
}

