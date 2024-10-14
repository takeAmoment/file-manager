import { rm } from 'fs/promises'
import { normalize } from 'path'
import process from 'process'

import { createFilePath } from '../utils/utils.js'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'


export const removeFile = async (commandArgs) => {
  if (commandArgs.length !== 1) {
    console.error('Invalid input')
    return
  }

  const workingDirectory = process.cwd()
  const filePath = normalize(commandArgs[0])
  const fullFilePath = createFilePath(workingDirectory, filePath)


  try {
    rm(fullFilePath)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`${OPERATION_FAILED_MESSAGE}. This file or directory does not exist`);
    } else {
      console.error(`${OPERATION_FAILED_MESSAGE}.${error}`)
    }
  
  }
}