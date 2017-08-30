

const hints = {
	init:`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`,
    studentMsg:`请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），学科名称请用英文，按回车提交：`,
    studentMsgError:`请按正确的格式输入（格式：姓名, 学号, 班级, 学科: 成绩, ...）学科名称请用英文：`,
    studentMsgRight:`学生xxx的成绩被添加`,
    sid:`请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`,
    sidError:`请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`
};

const caseResult = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
张三|75|95|80|80|82.5|330
李四|85|80|70|90|81.25|325
========================
全班总分平均数：xxx
全班总分中位数：xxx`;

var readlineSync = require('readline-sync');
const question = readlineSync.question;

let students = [];

function checkStudent(str){
	 let result = true;
	 let arr = str.split(',');
     if(arr.length !== 7){result = 1;}
     let exp1 = /^[\d]+&/;	
     if(exp1.exec(arr[1]) == null || exp1.exec(arr[2]) == null){result = 2;}
     let exp2 = /^\S{2}[\:|\：]{1}\d{1,3}$/;
     if(exp2.exec(arr[3]) == null || exp2.exec(arr[4]) == null || exp2.exec(arr[5]) == null || exp2.exec(arr[6]) == null){result = 3;}
     let exist = students.some(x => x.sid === arr[1]);
     if(exist){result = false;}	
     return result;
}

function formatStudent(str){
     let result = new Object();
     let arr = str.split(',');
     result['name'] = arr[0];
     result['sid'] = arr[1];
     result['class'] = arr[2];
     let count = 0;
     arr.forEach((x,index) => {
     	if(index >2){
     		let arr = x.split(':');
     		let course = arr[0];
     		let number = arr[1];
     		switch(course){
     			case 'chinese':
     			  result['chinese'] = number;
     			  count += parseInt(number);
     			  break;
     			case 'math':
     			  result['math'] = number;
     			  count += parseInt(number);
     			  break;
     			case 'english':
     			  result['english'] = number;
     			  count += parseInt(number);
     			  break;
     			case 'programming':
     			  result['programming'] = number;
     			  count += parseInt(number);
     			  break;
     			default:
     			  break;            
     		}
     	}
     }); 
     result['average'] = count/4;
     result['summary'] = count;
     return result; 
}

function checkSid(str){
	let arr = str.split(',');
	let result = true;
	if(arr.length === 0){result = false;}
	result = arr.every(x => /^[\d]+$/g.exec(x));
	return result;
}

function getMiddleNumber(arr){
	let result = 0;
    let newArr = arr.sort((x,y) => y - x);
    let len = newArr.length;
    if(len%2){
        result = newArr[Math.floor(len/2)]; 
    }else{
    	result = (newArr[len/2] + newArr[len/2 - 1])/2;        
    }
    return result;
}
function getAllSummary(arr){
    let result = new Object();
    let middleNumberArr = [];
    students.forEach(x => {
        middleNumberArr.push(x.summary); 
    });
    result['summary'] = middleNumberArr.reduce((a,b) => a + b)/middleNumberArr.length;
    result['middleNumber'] = getMiddleNumber(middleNumberArr);
    return result;
}

function coreSheet(sid){
    let arr = sid.split(',');
    let result = new Object();
    let selectArr = students.filter(x => arr.includes(x.sid));
    let summary = getAllSummary(selectArr);
    result['coreSheet'] = selectArr;
    result['summary'] = summary;
    return result;
}

function viewModel(obj){
    let result = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
`;
obj.coreSheet.forEach(x => {
    result += x.name + '|' + x.math + '|' + x.chinese + '|' + x.english + '|' + x.programming + '|' + x.average + '|' + x.summary + '\n';   
})
    result += '========================\n';
    result += '全班总分平均数：' + obj.summary.summary + '\n';
    result += '全班总分中位数：' + obj.summary.middleNumber;
    return result;
}

function stepOne(inputs){
	if(checkStudent(inputs)){
       let infoStudent = formatStudent(inputs);
       students.push(infoStudent);
       question(hints.studentMsgRight);
    }else{
       let input = question(hints.studentMsgError);
       stepOne(input);
    }
}

function stepTwo(sid){
	if(checkSid(sid)){
        let studentMsg = coreSheet(sid);
        let result = viewModel(studentMsg);
        question(result);
    }else{
        let id = question(hint.sidError);
        stepTwo(sid);
    }
}

function main(){
    let answer = '';
	while(true){
		answer = question(hints.init);
		switch(answer){
             case '1':
                let inputs = question(hints.studentMsg);
                stepOne(inputs);
                break;
             case '2':
                let sid = question(hints.sid);
                stepTwo(sid);
                break;
             case '3':
                return;
             default:
                return;         
		}		
	}
}


module.exports = main;