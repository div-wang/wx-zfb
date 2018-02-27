
let queryRouterLastOne = function () {
  let str = document.location.pathname.split('/')
  let router = str[str.length - 1].split('?')[0]
  return router === '' ? str[str.length - 2] : router
}

export default queryRouterLastOne
