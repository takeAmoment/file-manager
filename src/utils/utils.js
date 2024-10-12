import { changeDirectory } from '../navigation/changeDirectory.js'
import { moveUp } from '../navigation/moveUp.js'


export const parseCommand = (command) => {
  const commandArr = command.split(' ')
  const commandName = commandArr[0]
  const commandArgs = commandArr.slice(1)

  return  { commandName, commandArgs}
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
    default:
      console.log('Invalid input:', command)
  }
}