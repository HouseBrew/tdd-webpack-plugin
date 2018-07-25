import path from 'path'

function* getParentDirectories(file: string, until: string = '/') {
  let cd: string = file
  while (cd.includes(until) && cd !== '/' && cd !== until) {
    cd = path.dirname(cd)
    yield cd
  }
}

export {getParentDirectories}
