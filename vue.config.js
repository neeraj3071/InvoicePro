module.exports = {
  transpileDependencies: [],
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/InvoicePro/'
    : '/'
}