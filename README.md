

我们现在做一个命令行应用。当程序启动的时候，我们会看到一个命令行的主界面：

1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
如果我们输入1，那么界面就会变成：

请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：
如果输入格式不正确，就返回：

请按正确的格式输入（格式：姓名, 学号, 班级, 学科: 成绩, ...）：
如果输入格式正确就会返回

学生xxx的成绩被添加
然后打印

1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
等于回到了主界面。
如果我们在主界面输入了2，那么界面就会变成：

请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
如果我们输入的不正确，就会打印：

请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
如果输入的格式正确，则会打印成绩单并回到主界面。

成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
张三|75|95|80|80|82.5|330
李四|85|80|70|90|81.25|325
========================
全班总分平均数：xxx
全班总分中位数：xxx
如果我们输入的学号不存在，该学号在计算时就会被忽略。
