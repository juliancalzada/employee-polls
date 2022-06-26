const logger = (store) => (next) => (action) => {
  console.group(action.type);
  const retVal = next(action);
  console.log("The new state");
  console.dir(store.getState());
  console.table(action);
  console.groupEnd();
  return retVal;
};

export default logger;
