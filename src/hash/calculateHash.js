import process from 'process'
import path from 'path'
import { createReadStream } from 'fs'
import { createHash } from 'crypto'

import { checkIsFileExist, createFilePath } from '../utils/utils.js'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

export const calculateHash = async (commandArgs) => {
  if(commandArgs.length !== 1) {
    console.error('Invalid input')
    return
  }

  const workingDirectory = process.cwd()
  const filePath =  path.normalize(commandArgs[0])
  const fullFilePath = createFilePath(workingDirectory, filePath)

  const isFileExist = await checkIsFileExist(fullFilePath)

  if(!isFileExist) {
    console.error(`${OPERATION_FAILED_MESSAGE}. This file does not exist`)
  }

  try {
    const readableStream = createReadStream(fullFilePath, { encoding: 'utf-8'})
    const hash = createHash('sha256')

    readableStream.on('data', (data) => hash.update(data))

    readableStream.on('error', (error) => console.error(`${OPERATION_FAILED_MESSAGE}. ${error}`))
    
    readableStream.on('end', () => {
      const result = hash.digest('hex')
      console.log(`Hash: ${result}`)
    })
  } catch (error) {
    console.error(`${OPERATION_FAILED_MESSAGE}. ${error}`)
  }

}