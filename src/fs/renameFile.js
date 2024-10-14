import path from 'path'
import { rename } from 'fs/promises'

import { checkIsFileExist, createFilePath } from '../utils/utils.js'

export const renameFile = async (commandArgs) => {
  if(commandArgs.length !== 2) {
    console.error('Invalid input')
    return
  }

  const workingDirectory = process.cwd()
  const sourcePath = path.normalize(commandArgs[0])
  const newFileName = path.normalize(commandArgs[1])
  const oldFilePath = createFilePath(workingDirectory, sourcePath)
  const newFilePath = createFilePath(workingDirectory, newFileName)

  try {
    const isFileExist = await checkIsFileExist(oldFilePath)

    if(!isFileExist) {
      console.error(`${OPERATION_FAILED_MESSAGE}. This fail does not exists`)
      return
    }

    rename(oldFilePath, newFilePath)
  } catch (error) {
    console.error(`${OPERATION_FAILED_MESSAGE}. ${error}`)
  }
}