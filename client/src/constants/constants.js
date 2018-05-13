const constants = (keys) => {
  return keys.reduce((obj, key) => { 
    obj[key] = key
    return obj
  }, {})
}

export default constants
