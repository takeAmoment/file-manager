import { join } from 'path'
import { rename } from 'fs/promises'

import { checkIsFileExist } from '../utils/utils.js'

export const renameFile = async (commandArgs) => {
  if(commandArgs.length > 2) {
    console.error('Invalid input')
    return
  }

  const dirName = process.cwd()
  const originFileName = commandArgs[0]
  const newFileName = commandArgs[1]
  const oldFilePath = join(dirName, originFileName)
  const newFilePath = join(dirName, newFileName)

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