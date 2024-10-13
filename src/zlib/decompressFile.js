import { createBrotliDecompress } from 'zlib'

import { handleZlipCommand } from "./handleZlipCommand.js"

export const decompressFile = async (commandArgs) => {
  if (commandArgs.length !== 2) {
    console.error('Invalid input')
    return
  }
  
  const gzip = createBrotliDecompress()
  await handleZlipCommand(commandArgs[0], commandArgs[1], gzip)
}