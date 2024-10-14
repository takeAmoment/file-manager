import process from 'process'
import os from 'os'

const getRootDir = () => {
  if (os.platform() === 'win32') {
    return `${process.cwd().charAt(0)}:\\`
  }
  return '/'
}

export const moveUp = (commandArgs) => {
  if(commandArgs.length !== 0) {
    console.error('Invalid input')
    return
  }
  
  const currentDir = process.cwd()
  const rootDir = getRootDir()

  if (currentDir !== rootDir) {
    process.chdir('..')
  }
}

