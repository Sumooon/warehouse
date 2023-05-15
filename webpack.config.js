const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const { ModuleFederationPlugin } = require('webpack').container
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')



const { resolve } = require('path')
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand') // 处理变量场景
// 通过env文件设置process.env配置
function getProcessEnv(webpackEnv) {
  const fileName = webpackEnv.WEBPACK_BUILD ? './.env.production' : './.env'
  const fileEnv = dotenv.config({ path: resolve(fileName) })
  if (fileEnv.error) {
    throw new Error(fileEnv.error)
  }
  variableExpansion.expand(fileEnv)
  return {
    ...fileEnv.parsed,
    // for vue project env variable
    PUBLIC_PATH: fileEnv.parsed.PUBLIC_PATH || '/',
    BASE_URL: fileEnv.parsed.PUBLIC_PATH || '/'
  }
}

const title = '工具仓'
const port = 6066


module.exports = (env) => {
  let processEnv = getProcessEnv(env)
  console.info('processEnv ', processEnv)
  return {
    mode: env.WEBPACK_BUILD ? 'production' : 'development',
    cache: false,
    devtool: env.WEBPACK_BUILD ? false : 'source-map',
    target: 'web',
    entry: ['./src/main.ts'],
    output: {
      path: resolve('dist'),
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: processEnv.PUBLIC_PATH // 修复刷新后main.js获取路径问题
    },
    resolve: {
      extensions: ['.vue', '.js', '.ts', '.tsx'],
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
      BMap: 'BMap'
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: resolve('./public/index.html'),
        title,
        favicon: resolve('./public/favicon.ico')
      }),
      // fork-ts-checker-webpack-plugin，顾名思义就是创建一个新进程，专门来运行Typescript类型检查。这么做的原因是为了利用多核资源来提升编译的速度
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: require.resolve('vue/compiler-sfc')
            }
          },
          diagnosticOptions: {
            semantic: true
            // https://github.com/TypeStrong/ts-loader#happypackmode
            // syntactic: useThreads
          }
        }
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(processEnv)
      })
      // 剥离除 "zh-cn" 以外的所有语言环境。
      //（“en” 内置于 Moment 中，无法移除）
      // new MomentLocalesPlugin({
      //   localesToKeep: ['zh-cn']
      // })
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.(ts|tsx)$/i,
          loader: 'ts-loader',
          exclude: ['/node_modules/']
        },
        {
          test: /\.js$/,
          exclude: {
            and: [/node_modules/], // Exclude libraries in node_modules ...
            not: [
              // Except for a few of them that needs to be transpiled because they use modern syntax
              /xiangxin-element/
            ]
          },
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3,
                      proposals: true // 使用尚在“提议”阶段特性的 polyfill
                    },
                    targets: 'ie 11'
                  }
                ]
              ],
              // 下面指的是在生成的文件中，不产生注释
              comments: false
            }
          }
        },
        /**
         * 临时解决方案
         * https://github.com/webpack/webpack/issues/16660
         */
        {
          test: /.mjs$/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'postcss-loader',
            'sass-loader'
            // {
            //   loader: 'sass-resources-loader',
            //   options: {
            //     resources: [
            //       resolve('src/styles/variables.scss') // 引入全局 SasS 变量的文件（对应你全局文件的路径）
            //     ]
            //   }
            // }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset'
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      /**
       * 以下为细化拆分
       * 好处：没有大体积的文件
       * 坏处：拆分为多个小文件导致浏览器请求数变多，总体渲染完成时间比大文件要长
       */
      // mergeDuplicateChunks: true, // 合并相同的 chunk
      // splitChunks: {
      //   chunks: 'async',
      //   minSize: 100 * 1024, // 生成 chunk 的最小体积（以 bytes 为单位）。默认20000
      //   maxAsyncRequests: 5, // 按需加载时并行请求的最大数目。默认30
      //   maxInitialRequests: 3, // 入口点的最大并行请求数，默认30
      //   cacheGroups: {
      //     elementUI: {
      //       priority: 20,
      //       name: 'element-plus',
      //       test: /element-plus|xiangxin-element/,
      //       minSize: 1000 * 1024,
      //       reuseExistingChunk: true
      //     },
      //     xiangxinWc: {
      //       priority: 20,
      //       name: 'xiangxin-wc',
      //       test: /xiangxin-wc/,
      //       minSize: 1000 * 1024,
      //       reuseExistingChunk: true
      //     },
      //     vendor: {
      //       name: `chunk-vendors`,
      //       test: /[\\/]node_modules[\\/]/,
      //       minChunks: 1,
      //       maxAsyncRequests: 5,
      //       minSize: 100 * 1024,
      //       maxSize: 5 * 1000 * 1024,
      //       priority: -10
      //     },
      //     common: {
      //       name: `chunk-common`,
      //       minChunks: 2,
      //       priority: -20,
      //       chunks: 'initial',
      //       reuseExistingChunk: true //如果当前块包含已经从主包中分离出来的模块，那么该模块将被重用，而不是生成新的模块
      //     }
      //   }
      // },
      minimize: true,
      minimizer: [
        // 设置打包不开启多线程
        new TerserPlugin({
          parallel: false,
          extractComments: false
        })
      ]
    },
    devServer: {
      compress: true,
      port,
      allowedHosts: 'all',
      hot: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      },
      proxy: {
        '/': {
          target: 'http://123.57.194.222:9090/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}
