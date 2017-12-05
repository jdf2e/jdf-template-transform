# jdf-template-transform
velocity template transform to smarty or trimpath template

velocity模板 转 smarty模板或者trimpath模板

转换的特性有：
* 变量：支持纯变量，点连接，方括号连接，变量嵌套，不支持method调用
* 赋值：支持数字，字符串，数组，变量、比较表达式等赋值方式，不支持null、undefined、对象
* 运算：+ - * / ()，其他暂未实现
* 比较：> < >= <= == == != !，不支持三目运算符 
* 判断：与或非
* if/elseif/else
* foreach, 不支持foreachelse
* $velocityCount or $foreach.count