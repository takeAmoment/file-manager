import { access, constants } from 'fs/promises'
import path from 'path'

import { changeDirectory, getList, moveUp } from '../navigation/index.js'
import { readFile, createFile, renameFile, copyFile, moveFile, removeFile } from '../fs/index.js'
import { provideOSInfo } from '../os/provideOSInfo.js'
import { calculateHash } from '../hash/calculateHash.js'
import { compressFile, decompressFile } from '../zlib/index.js'

export const parseCommand = (command) => {
  const commandArr = command.split(' ')
  const commandName = commandArr[0]
  const commandArgs = commandArr.slice(1)

  return { commandName, commandArgs }
}

export const checkCommand = (command) => {
  const { commandName, commandArgs } = parseCommand(command)

  switch (commandName) {
    case 'up':
      moveUp(commandArgs)
      break
    case 'cd':
      changeDirectory(commandArgs)
      break
    case 'ls':
      getList(commandArgs)
      break
    case 'cat':
      readFile(commandArgs)
      break
    case 'add':
      createFile(commandArgs)
      break
    case 'rn':
      renameFile(commandArgs)
      break
    case 'cp':
      copyFile(commandArgs)
      break
    case 'mv':
      moveFile(commandArgs)
      break
    case 'rm':
      removeFile(commandArgs)
      break
    case 'os':
      provideOSInfo(commandArgs)
      break
    case 'hash':
      calculateHash(commandArgs)
      break
    case 'compress':
      compressFile(commandArgs)
      break
    case 'decompress':
      decompressFile(commandArgs)
      break
    default:
      console.error('Invalid input:', command)
  }
}

export const checkIsFileExist = async (filePath) => {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

export const checkIsPathAbsolute = (pathName) => {
  path.isAbsolute(pathName)
}

export const createFilePath = (workingDirectory, filePath) => {
  const filePathIsAbsolute = checkIsPathAbsolute(filePath)
  let fullFilePath

  if (filePathIsAbsolute) {
    fullFilePath = filePath
  } else {
    fullFilePath = path.resolve(workingDirectory, filePath)
  }

  return fullFilePath
}

