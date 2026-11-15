---
title: "LB2: C 语言语法与程序设计"
description: "no comments"
published: true
publishedDate: 2026-11-15
updatedDate: 2026-11-15
---

### Hello World

```c
// hello.c
#include <stdio.h>

int main(void) {
	printf("Hello, World!");
	return 0;
}
```

`main()` 函数为程序入口，`stdio` 库提供函数 `printf` 打印字符串，`return 0;` 表明正常退出，`// ...` 为注释。

使用 `gcc hello.c -o hello` 编译生成可执行文件 `hello`，使用 `./hello` 执行它，控制台将打印 `Hello, World!`.

### 基础语法

关键字、标识符、常量、字符串字面量、运算符、分隔符。

### 数据类型

基本算术类型：字符、整型、浮点型。

void 类型：通常用于：返回值为空、函数参数为空、指针指向空（类型为 `void *` 的指针代表对象的地址，而不是类型）。

枚举类型

派生类型

类型转换：隐式类型转换（小转大）、显式类型转换。

### 变量与常量

变量声明、变量初始化、变量不初始化（默认值将取决于该变量的类型和其所在的作用域：全局和静态为零，否则为垃圾值）。

存储类：`auto`、`register`、`static`、`extern` 关键字。

左值和右值。

字面量、`const` 关键字。

### 运算符

算术运算符、关系运算符、逻辑运算符、位运算符、赋值运算符、杂项（`sizeof`、取地址、指针、三目）

### 控制流语句

判断、循环、函数。

作用域规则

递归、可变参数。

### 数组、指针、字符串

### 函数指针与回调函数

### 枚举、结构体、联合体

联合体（共用体）。

### 位域

### `typedef`

### 输入输出与文件操作

### 预处理器

宏展开、文件包含、条件编译、特殊指令处理。

### 错误处理

`assert()`.

### 内存管理

### 未定义行为

### 命令行参数

### C 项目工程结构

```
project/
 |- src/
 |   |- main.c 
 |- include/
 |- tests/
 |- lib/
 |- build/
 |- doc/
 |- tools/
 |- Makefile
 |- CMakeLists.txt
 |- README.md
 |- LICENSE
 |- .gitignore
```




