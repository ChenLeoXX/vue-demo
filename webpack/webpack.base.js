const path = require('path')
const entry = require('./entry')
module.exports={
    context:path.resolve('./src'),
    entry:entry,
    output:{
        publicPath:'/',
        path:path.resolve('./dist'),
        filename: '[name].js'
    },
    devtool:'inline-sourc-map',
    watch:true,
    devServer:{
        port:'8080',
        contentBase:path.resolve('./src'),
        compress:true
    },
    module:{
        rules:[
            {
                test:/\.js[x]?$/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[

    ],
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.common.js'
        }
      }
}