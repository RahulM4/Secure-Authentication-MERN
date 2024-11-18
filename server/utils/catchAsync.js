// define try catch block
export default (fun) =>     {return (req, res, next) => {fun(req, res, next).catch(next)} }
