
export default ({ cond, errMsg }) => {
    if (cond) throw new Error(errMsg);
}
