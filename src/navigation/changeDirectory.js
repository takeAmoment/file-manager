import process from 'process'
import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

export const changeDirectory = (args) => {
  if (args.length > 1) {
    console.error(OPERATION_FAILED_MESSAGE)
  }

  const path = args[0]

  try {
    process.chdir(path)
  } catch (error) {
    if (error === 'ENOENT') {
      console.error(`${OPERATION_FAILED_MESSAGE}. Such path does not exist`)
    } else {
      console.error(`${OPERATION_FAILED_MESSAGE}`)
    }
  }
}
