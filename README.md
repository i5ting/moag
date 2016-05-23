# Moajs

Moajs is a open-source web framework based expressjs、mongoose、bluebird、mocha that’s optimized
for programmer happiness and sustainable productivity. It lets you
write beautiful code by favoring convention over configuration.

[![gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]

* Modular && Plugable
* Scaffold
* Model-View-Controller (MVC) pattern
* Restful Api
* Auto mount routes
* Mongoosedao for data access
* Gulp as task management
* Live reload
* Runtime Server 


![](doc/moa.jpg)

> "Lost, like the Moa is lost" - Maori proverb

## Requirement 

- nodejs v0.10 + 
- nvm    v0.25 +
- gulp   v3.90 +

## Install

    [sudo] npm install -g moag
    
## Usage

### help

    ➜  moag git:(master) moa
    Moajs HELP:

    moag: 【创建脚手架】 moag user name:string password:string uid:object

    Have a good day! Moaer
    
### create scaffold user

    moag user name:string password:object
    
    
mongoose支持的data type基本如下：

- String -> string
- Number-> number
- Date -> date
- Boolean -> boolean
- Buffer -> buffer
- ObjectId -> object
- Mixed  -> mixed
- Array -> array

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## History


- v1.0.0 init


## Welcome fork and feedback

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).


[npm-image]: https://img.shields.io/npm/v/moag.svg?style=flat-square
[npm-url]: https://npmjs.org/package/moag
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/i5ting/moag?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge