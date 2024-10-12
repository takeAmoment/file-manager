import process, { stdin, argv } from 'process'

const USERNAME_START_POSTFIX = '--'
const GREETING = 'Welcome to the File Manager'

const checkCommand = (command) => {
  switch (true) {
    case command.startsWith('os'):
      console.log('os command')
      break
    default:
      console.log('This command does not exist', command)
  }
}

const closeProcess = (userName) => {
  console.log(`\nThank you for using File Manager, ${userName}, goodbye!`)
  process.exit(0)
}

const handleInput = (data, userName) => {
  const formatedData = data.toString().toLocaleLowerCase().trim()

  if (formatedData === '.exit') {
    closeProcess(userName)
  } else {
    checkCommand(formatedData)
  }
}

const startFileManager = async () => {
  try {
    const userName = argv
      .find((item) => item.startsWith(USERNAME_START_POSTFIX))
      .split('=')[1]
    console.log(`\n${GREETING}, ${userName}!`)

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
