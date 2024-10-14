import { rm } from 'fs/promises'

import { copyFile } from './copyFile.js'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

export const moveFile = async (commandArgs) => {
  const fullFilePath = await copyFile(commandArgs)

  if (!fullFilePath) {
    return
  }

  try {
    await rm(fullFilePath)
  } catch (error) {
    console.log(`${OPERATION_FAILED_MESSAGE}. ${error}`)
  }
}
