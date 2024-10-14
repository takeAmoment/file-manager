import process from 'process'
import path from 'path'
import { writeFile } from 'fs/promises'

import { checkIsFileExist, createFilePath } from '../utils/utils.js'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

export const createFile = async (commandArgs) => {
  if(commandArgs.length !== 1) {
    console.error('Invalid input')
    return
  }

  const workingDirectory = process.cwd()
  const sourcePath = path.normalize(commandArgs[0])
  const filePath = createFilePath(workingDirectory, sourcePath)

  try {
    const isFileExist = await checkIsFileExist(filePath)

    if(isFileExist) {
      console.error(`${OPERATION_FAILED_MESSAGE}. This fail already exists`)
      return
    }
    
    writeFile(filePath, '')
  } catch (error) {
    console.error(`${OPERATION_FAILED_MESSAGE}. ${error}`)
  }
}