import path from 'path'

const getParentDirectories = (file: string, until: string = '/'): string[] => {
  if (!file) {
    return []
  }
  const result: string[] = []
  let cd: string = file
  console.log(cd)
  while (cd.includes(until) && cd !== '/' && cd !== until) {
    cd = path.dirname(cd)
    result.push(cd)
  }
  return result
}

export {getParentDirectories}
