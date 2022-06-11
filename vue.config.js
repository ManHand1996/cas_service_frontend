const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports ={
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader", options: {
                    strictMath: true,
                    noIeCompat: true
                }
            }]
        }]
    },
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
}
module.exports = defineConfig({
  transpileDependencies: true,
    // productionSourceMap: false,
    
    devServer: {
    

      port: 8080,
        proxy:{
          '/api/*': {
              pathRewrite:{
                  '^/api':'/'
              },
              target: 'http://127.0.0.1:8000',
              changeOrigin: true,
              ws: true,
              
              
              headers:{
                  referer: 'http://127.0.0.1:8000/',
                  host: 'http://127.0.0.1:8000/'
              }
          },
          
            
        }
    },
    
    
  
})

