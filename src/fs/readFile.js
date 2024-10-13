import { createReadStream } from 'fs'
import { join } from 'path'
import process from 'process'

import { checkIsFileExist } from '../utils/utils.js'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

export const readFile = async (commandArgs) => {
  if(commandArgs.length > 1) {
    console.error('Invalid input')
    return
  }

  const fileName = commandArgs[0]
  const dirName = process.cwd()
  const filePath = join(dirName, fileName)
  let result = ''

  try { 
    const isFileExist = await checkIsFileExist(filePath)

    if(!isFileExist) {
     console.error(`${OPERATION_FAILED_MESSAGE}. File does not exist`)
     return
    }

    const readableStream = createReadStream(filePath,  { encoding: 'utf8' })
  
    readableStream.on('data', (data) => {
      result += data
    })
  
    readableStream.on('error', () => {
      console.error(OPERATION_FAILED_MESSAGE)
    })
  
    readableStream.on('end', () => {
      console.log('Result:\n', result)
    })
  } catch (error) {
    
  }

}