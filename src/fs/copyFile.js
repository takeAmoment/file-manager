import process from 'process'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'

import { checkIsPathAbsolute, createFilePath } from '../utils/utils.js'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

const createPathToNewFile = (workingDirectory, pathToDirectory, fileName) => {
  const isAbsolutePath = checkIsPathAbsolute(pathToDirectory)
  let pathToNewFile

  if (isAbsolutePath) {
    pathToNewFile = path.resolve(pathToDirectory, filePath)
  } else {
    pathToNewFile = path.resolve(
      workingDirectory,
      `${pathToDirectory}/${fileName}`
    )
  }

  return pathToNewFile
}

export const copyFile = async (commandArgs) => {
  if (commandArgs.length !== 2) {
    console.error('Invalid input')
    return
  }

  const workingDirectory = process.cwd()
  const filePath = path.normalize(commandArgs[0])
  const pathToDirectory = path.normalize(commandArgs[1])
  const fileName = path.basename(filePath)

  let fullFilePath = createFilePath(workingDirectory, filePath)
  let pathToNewFile = createPathToNewFile(
    workingDirectory,
    pathToDirectory,
    fileName
  )

  try {
    const readableStream = createReadStream(fullFilePath, { encoding: 'utf-8'})
    const writableStream = createWriteStream(pathToNewFile)

    await pipeline(readableStream, writableStream)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`${OPERATION_FAILED_MESSAGE}. This file or directory does not exist`);
    } else {
      console.log(`${OPERATION_FAILED_MESSAGE}. ${error}`);
    }
  }
}
