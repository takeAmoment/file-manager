import { access, constants } from 'fs/promises'
import path from 'path'

import { changeDirectory } from '../navigation/changeDirectory.js'
import { getList } from '../navigation/getList.js'
import { moveUp } from '../navigation/moveUp.js'
import { readFile } from '../fs/readFile.js'
import { createFile } from '../fs/createFile.js'
import { renameFile } from '../fs/renameFile.js'
import { copyFile } from '../fs/copyFile.js'
import { moveFile } from '../fs/moveFile.js'
import { removeFile } from '../fs/removeFile.js'
import { provideOSInfo } from '../os/provideOSInfo.js'

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
      moveUp()
      break
    case 'cd':
      changeDirectory(commandArgs)
      break
    case 'ls':
      getList()
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
