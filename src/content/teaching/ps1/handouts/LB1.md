---
title: "LB1: 计算机基础知识"
description: "no comments"
published: true
publishedDate: 2026-10-30
updatedDate: 2026-11-01
---

### 二进制

我们平常所用的十进制数字可以看作是一种级数求和：$a_{n-1}\cdots a_1a_0.a_{-1}\cdots_{(10)}=\sum_{i=-\infty}^{\infty}a_i\times 10^i$.

将底数 $10$ 换为 $2$，我们就得到了数的二进制表示：$b_{n-1}\cdots b_1b_0.b_{-1}\cdots_{(2)}=\sum_{i=-\infty}^{\infty}b_i\times 2^i$.

不过有些类似于二进制的表示有其它规则，例如补码和浮点数表示。

### 图灵机

我一直认为 PS1 不讲图灵机是一种遗憾。

> A Turing machine is a mathematical model of computation describing an abstract machine that manipulates symbols on a strip of tape according to a table of rules. Despite the model's simplicity, it is capable of implementing any computer algorithm.
>
> 图灵机是一种计算模型，它描述了一种抽象的机器：这种机器能够根据预先设定的规则来操作磁带上的符号。尽管该模型的结构相当简单，但它却能够实现任何计算机算法。
>
> Source: Wikipedia Turing machine. 来源：维基百科 图灵机

直观上，图灵机模型包含如下事物：一条无限长而划分为无限多个小格的纸带，一台读写头指向纸带上某一格子、且有一个状态的机器，一张指令表。

另外，我们有一个符号集合，记录了这个模型中用到的所有符号。

纸带的各个格子上有有限个符号，除此之外都是空的。机器的读写头指向纸带上某一格子，每次机器检查读写头指向的格子上是什么符号（或者是空格子），并检查自己是什么状态。

指令表记录了机器处于什么状态，读写头指向什么符号应该做什么，包括：

1. 机器的状态改变为何种状态？

2. 读写头指向的格子符号应变更为何种符号？

3. 纸带向左移动还是向右移动？

特别地，所有状态中有一些状态称为「接受状态」，一旦机器处于某个接受状态，则停止并给出「接受回答」；否则机器将一直运行下去。

![LB1-fig-01-turing_machine](LB1-fig-01-turing_machine.png)

形式化地，如上图灵机被表示为七元组 $M=\langle  Q, \Gamma, b, \Sigma, \delta, q_0, F\rangle$，其中 $Q$ 为有限非空的状态集合，$\Gamma$ 为有限非空的符号集合，$b$ 是空白符号，$\Sigma\subseteq\Gamma\setminus b$ 为初始纸带上符号的集合，$q_0\in Q$ 为初始状态，$F\subseteq Q$ 为接受状态集合，$\delta:(Q\setminus F)\times \Gamma\to Q\times \Gamma \times \{L, R\}$ 为表示指令表的转移函数，$L,R$ 分别表示纸带左移或右移。

另外将 $\{L, R\}$ 修改为 $\{L, R, N\}$ 即增加纸带不动的选项，不会对计算能力造成什么影响，简单地说就是新的机器和图灵机是等价的。

图灵机是现代计算机采用的模型，纸带（tape）就是内存（memory）、读写头（processor）就是 CPU、指令表（rulebook）就是程序（program）。

### 计算机体系结构简论

> 关于计算机体系结构，参见[计算机体系结构基础_基于LoongArch_第三版 引言](https://foxsen.github.io/archbase/%E5%BC%95%E8%A8%80.html#%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84%E7%9A%84%E7%A0%94%E7%A9%B6%E5%86%85%E5%AE%B9)。

最早的计算机都采用固定程序设计，就如同图灵机中指令表确定好了，例子是计算器。但这显然不利于进行更复杂算法的运行，因此提出了「存储程序计算机（stored-program computer）」。现代计算机普遍采用冯诺依曼结构（Von Neumann architecture），其特点如下：

1. 计算机由存储器、运算器、控制器、输入设备和输出设备五部分组成，其中运算器和控制器合称为中央处理器（Central Processing Processor，简称 CPU）。

2. 存储器是按地址访问的线性编址的一维结构，每个单元的位数固定。

3. 采用存储程序方式，即指令和数据不加区别混合存储在同一个存储器中。

4. 控制器通过执行指令发出控制信号控制计算机的操作。指令在存储器中按其执行顺序存放，由指令计数器指明要执行的指令所在的单元地址。指令计数器一般按顺序递增，但执行顺序可按运算结果或当时的外界条件而改变。

5. 以运算器为中心，输入输出设备与存储器之间的数据传送都经过运算器。

![LB1-fig-02-von_neumann_architecture](LB1-fig-02-von_neumann_architecture.png)

因为现代计算机体系结构过于复杂，我们给出一种简化的模型机结构：

![LB1-fig-03-model_machine_architecture](LB1-fig-03-model_machine_architecture.jpg)

我们可以将其和冯诺依曼结构对照。

如上是硬件结构，在软件层面，我们设计了指令系统，其包括操作码和操作数，CPU 通过一些手段将主存内数据和寄存器数据进行传送，CPU 仅操作寄存器进行运算。

PC 即程序计数器（program counter），在无跳转指令的情况下，默认增加一条指令的长度，换句话说，这对应了程序设计中的**顺序结构**。

而在有跳转指令的情况下，程序计数器将被修改，这就使得接下来的指令是某一处的指令，这对应了 **`jump`** 或者说 **`goto`**.

而自从 Dijkstra 提出 `goto` 有害论以来，在软件层面写 `goto` 被严加限制，最终形成了具有同等能力的「结构化程序设计」，即将流程控制限制为「顺序结构」、「分支结构」、「循环结构」。

#### 逻辑门、处理器、存储器

> Wir müssen wissen. Wir werden wissen. — D. Hilbert
>
> 我们必须知道，我们必将知道。—— D. 希尔伯特

使用名为三极管的物理部件可以构建逻辑门。

![LB1-fig-04-transistors_and_logic_gates](LB1-fig-04-transistors_and_logic_gates.png)

我们考虑二进制加法，类似于竖式加法，设 $A+B=C$，那么 $C_i=A_i\oplus B_i\oplus G_{i-1}$ 而 $G_i = (A_iB_i)+(A_iG_{i-1})+(B_iG_{i-1})$，由此可构造串行多位加法器。

![LB1-fig-05-1bit-adder](LB1-fig-05-1bit-adder.png)

![LB1-fig-06-4bit-adder](LB1-fig-06-4bit-adder.png)

其它算术逻辑运算（加、减、按位与、按位或、按位异或、按位或非、逻辑左移、逻辑右移、算术右移、循环左移、循环右移）以及乘除法都可以轻松构建。其中如果将位展开，可以将串行部分甚至全部地替代为并行版本，提高效率。增加一个多路选择器（可通过与门和或门轻松实现），我们就可以构建算术逻辑单元（ALU, arithmetic logic unit）。

至此我们完成了冯诺依曼体系中的运算器，接下来按照模型机要求，使用逻辑门构建其控制器也是可以照猫画虎地完成的。从而构建完成了 CPU.

![LB1-fig-07-execution_of_instruments](LB1-fig-07-execution_of_instruments.png)

![LB1-fig-08-monocycle-microprocessor](LB1-fig-08-monocycle-microprocessor.png)

当然以上介绍其实相当简略，其内容将在南京大学课程 DLCO（数字逻辑与计算机组成）中详细介绍。我们提供如下关键词供您学习：二进制、补码、（IEEE754 标准浮点数）、逻辑门、译码器、解码器、多路选择器、桶形移位器、半加器、全加器、组合逻辑电路、ALU（算术逻辑单元）、（乘法器、除法器）、状态机、时序逻辑电路、锁存器、触发器、寄存器、通用寄存器组、PC（程序计数器）、指令译码器、数据路径、控制路径、流水线技术、冒险（hazard）、超流水线技术与超标量技术（多发射技术、动态调度技术、转移预测技术）、高速缓存（cache）。

> 参见：[计算机体系结构基础_基于LoongArch_第三版 第八章 运算器设计](https://foxsen.github.io/archbase/%E8%BF%90%E7%AE%97%E5%99%A8%E8%AE%BE%E8%AE%A1.html)、[计算机体系结构基础_基于LoongArch_第三版 第九章 指令流水线](https://foxsen.github.io/archbase/%E6%8C%87%E4%BB%A4%E6%B5%81%E6%B0%B4%E7%BA%BF.html)。

接下来我们介绍存储器层次结构（memory hierarchy）。

一图胜千言。

![LB1-fig-09-memory_hierarchy](LB1-fig-09-memory_hierarchy.png)

不难发现，越接近 CPU，可供元器件摆放的空间越小，还有噪声、散热等物理环境要求；同时越接近 CPU，访存速度越快，这导致存储器存在大小和速度方面的权衡（trade off），因此发明了了缓存技术。

关键词：寄存器、L1 cache、L2 cache、L3 cache、SRAM、DRAM、SCM、闪存、磁盘、软盘、硬盘。

#### 指令系统与操作系统

处理器很好，但是我们有更多的要求：

- 维持如上系统需要电，但是有的时候我不需要它工作。**如何上电和断电？**
- 用户需要交互，即有输入/输出（I/O, input/output）要求。**如何实现 I/O?**
- 处理器运行时发生错误，例如指令非法、访存不存在的内存。**如何处理异常？**
- 如果要实现多个程序的运行，虽然说可以并发，但需要手动把程序编在一起。**如何并发/并行地运行多个程序？（进程、线程、并发编程）**
- 数据随意存放在各种存储器中吗？**如何管理数据？（文件系统）**
- 需要注意硬件限制太令人困扰了！**能否使程序看似无限制？（虚拟化）**

这些要求是具体而繁杂的，不可能由人手动编写特定的程序，因此我们需要一种程序，其满足这些要求，提高设备可用性和交互性。因此我们引入了操作系统（operating system），由这个程序来管理这些「系统事务」。

常见的操作系统包括 Windows、Linux（及各发行版）、MacOS.






