import process, { stdin, argv } from 'process'
import { checkCommand } from './utils/utils.js'

const USERNAME_START_POSTFIX = '--'
const GREETING = 'Welcome to the File Manager'

const closeProcess = (userName) => {
  console.log(`\nThank you for using File Manager, ${userName}, goodbye!`)
  process.exit(0)
}

const printCurrentDir = () => {
  console.log(`You are currently in ${process.cwd()}`)
}

const handleInput = (data, userName) => {
  const formatedData = data.toString().trim()

  if (formatedData === '.exit') {
    closeProcess(userName)
  } else {
    checkCommand(formatedData)
  }

  printCurrentDir()
}

const startFileManager = async () => {
  try {
    const userName = argv
      .find((item) => item.startsWith(USERNAME_START_POSTFIX))
      .split('=')[1]
    console.log(`\n${GREETING}, ${userName}!`)
    printCurrentDir()

    stdin.on('data', (data) => handleInput(data, userName))

    stdin.on('error', (err) => {
      console.error(err)
    })

    process.on('SIGINT', () => {
      closeProcess(userName)
    })
  } catch (error) {
    console.error(`Sorry something went wrong: ${error}`)
    process.exit(0)
  }
}

await startFileManager()
