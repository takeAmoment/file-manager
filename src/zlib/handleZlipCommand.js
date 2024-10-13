import path from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { stat } from 'fs/promises'
import { pipeline } from 'stream/promises'
import process from 'process'

import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'
import { createFilePath } from '../utils/utils.js'

const checkIsFile = async (filePath) => {
  try {
    const stats = await stat(filePath)

    if (stats.isFile()) {
      return true
    } else {
      return false
    }

  } catch (error) {
    if (error.code === 'ENOENT') {
      return true
    }
    return false
  }
}

export const handleZlipCommand = async (readFilePath, writeFilePath, gzip) => {
  const workingDirectory = process.cwd()
  const sourcePath = path.normalize(readFilePath)
  const destinationPath = path.normalize(writeFilePath)

  const fullSourcePath = createFilePath(workingDirectory, sourcePath)
  const fullDestinationPath = createFilePath(workingDirectory, destinationPath)

  const isSourceFile = await checkIsFile(fullSourcePath)
  const isDestinationFile = await checkIsFile(fullDestinationPath)

  if (!isSourceFile || !isDestinationFile) {
    console.error(`${OPERATION_FAILED_MESSAGE}. FileName is absent`)
    return
  }

  try {
    const readableStream = createReadStream(fullSourcePath)
    const writableStream = createWriteStream(fullDestinationPath)

    await pipeline(readableStream, gzip, writableStream)

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`${OPERATION_FAILED_MESSAGE}. This file or directory does not exist`)
    }
    console.error(`${OPERATION_FAILED_MESSAGE}: ${error}`)
  }
}
