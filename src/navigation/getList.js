import { readdir } from 'fs/promises'
import process from 'process'

import { OPERATION_FAILED_MESSAGE } from '../variables/common.js'

const sortResult = (results) => {
  results.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type < b.type ? -1 : 1
    }

    return a.name.localeCompare(b.name)
  })
}

export const getList = async (args) => {
  if (args.length !== 0) {
    console.error(OPERATION_FAILED_MESSAGE)
    return
  }

  const dirName = process.cwd()
  const results = []

  try {
    const files = await readdir(dirName, { withFileTypes: true })
    files.forEach((file) => {
      let obj = {}

      obj['name'] = file.name
      if (file.isDirectory()) {
        obj['type'] = 'directory'
      } else if (file.isFile()) {
        obj['type'] = 'file'
      }
      results.push(obj)
    })
    sortResult(results)

    console.table(results)
  } catch (error) {
    console.error(`Operation failed: ${error}`)
  }
}
