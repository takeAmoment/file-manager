import os from 'os'

export const provideOSInfo = async (commandArgs) => {
  if (commandArgs.length !== 1 || !commandArgs[0].startsWith('--')) {
    console.error('Invalid input')
    return
  }

  const argument = commandArgs[0].slice(2)

  switch (argument) {
    case 'eol':
      const result = JSON.stringify(os.EOL)
      console.log(`EOL: ${result}`)
      break
    case 'cpus':
      const cpus = os.cpus()
      console.log(`Total amount of CPUS: ${cpus.length}`)

      cpus.forEach((item, index) => {
        console.log(`${index + 1}: ${item.model} ${item.speed / 1000} GHz`)
      })
      break
    case 'homedir':
      console.log(`Homedir: ${os.homedir()}`)
      break
    case 'username':
      console.log(`System username: ${os.userInfo().username}`)
      break
    case 'architecture':
      console.log(`CPU architecture: ${os.arch()}`)
      break
    default:
      console.error(`Invalid input: os ${commandArgs[0]}`)
  }
}

