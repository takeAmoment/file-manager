import { rm } from 'fs/promises'

import { copyFile } from './copyFile.js'

export const moveFile = async (commandArgs) => {
  const fullFilePath = await copyFile(commandArgs)

  if (!fullFilePath) {
    return
  }

  try {
    await rm(fullFilePath)
  } catch (error) {
    console.log(`Operation failed: ${error}`)
  }
}
