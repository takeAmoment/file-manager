import process from 'process'

import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

export const changeDirectory = async (args) => {
  if (args.length !== 1) {
    console.error(OPERATION_FAILED_MESSAGE)
    return
  }

  const path = args[0]

  try {
    process.chdir(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`${OPERATION_FAILED_MESSAGE}. Such file or dir does not exist`)
    } else {
      console.error(`${OPERATION_FAILED_MESSAGE}. ${error}`)
    }
  }
}
