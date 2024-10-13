import process from 'process'
import { join } from 'path'
import { writeFile } from 'fs/promises'

import { checkIsFileExist } from '../utils/utils.js'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

export const createFile = async (commandArgs) => {
  if(commandArgs.length > 1) {
    console.error('Invalid input')
  }

  const fileName = commandArgs[0]
  const dirName = process.cwd()
  const filePath = join(dirName, fileName)

  const isFileExist = await checkIsFileExist(filePath)

  if(isFileExist) {
    console.error(`${OPERATION_FAILED_MESSAGE}. This fail already exists`)
  }

  try {
    writeFile(filePath, '')
  } catch (error) {
    console.error(OPERATION_FAILED_MESSAGE)
  }
}