const set = (path, value) => {
  return {
    type: 'SET',
    payload: {
      path: path,
      value: value
    }
  }
};

export default {set};