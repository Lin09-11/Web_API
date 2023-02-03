// 先让其他文件加载完在执行js
window.addEventListener('load', function() {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    //图片的宽度 因为要经常用到 所以当中全局变量
    var focusWidth=focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })


    //3.动态生成小圆点  有几张图片，我就生成几个小圆点
    //因为ul和ol很多 加上focus可以缩小范围
    var ul=focus.querySelector('ul')
    var ol=focus.querySelector('.circle')
    //先求出ul中有多少个li
    for(var i=0;i<ul.children.length;i++){
        //创建一个小li
        var li=document.createElement('li');
        //记录当前小圆圈的索引号  通过自定义属性来做
        li.setAttribute('index',i);
        //把小li插入到ol里面
        ol.appendChild(li);
        //4.小圆圈的排他思想  我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click',function(){
            //干掉所有人 把所有的小li 清除current类名
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            //留下自己  当前的li 设置current类名
            this.className='current';
            //5.点击小圆圈 移动图片 当然是移动ul
            // animate(obj,target,callback)
            //ul的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            //当我们点击了某一个小li 就拿到当前小li 的索引号
            var index=this.getAttribute('index');
            //【问题：当我们点击小圆圈的第二个的时候 点击右侧按钮的时候 图片却出现上一张照片】
            //当我们点击某一个小li的时候 就拿到当前的li的索引号
            num=index;
            //当我们点击某一个小li的时候 就拿到当前的li的索引号
            num=circle;

            console.log(focusWidth);
            console.log(index);

            animate(ul,-index*focusWidth)

        })
    }
    //6.克隆第一张图片（li）放到ul的最后
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //7.点击右侧按钮 ，图片滚动一张
    var num=0;
    //circle  控制小圆圈的播放
    var circle=0;
    arrow_r.addEventListener('click',function(){
        //如果走到最后复制的一张图片 此时 我们的ul 要快速复原left 改为0
        if(num==ul.children.length-1){
            //复制操作
            ul.style.left=0;
            num=0;
        }
        num++;
        //移动的是ul不是li
        animate(ul,-num*focusWidth)

        //8.点击右侧按钮  小圆圈跟随一起变化  可以在声明一个变量控制小圆圈播放
        circle++;
        //如果circle==4  说明走到最后我们克隆的这张照片 我们就要复原
        if(circle==ol.children.length){
            circle=0;
        }
        circleChange();
    })

    //把ol里面的第一个小li设置类名位current
    ol.children[0].className='current';




    //9.左侧按钮做法
    arrow_l.addEventListener('click',function(){
        //如果走到最后复制的一张图片 此时 我们的ul 要快速复原left 改为0
        if(num==ul.children.length-1){
            //复制操作
            ul.style.left=-(ul.children.length-1)*focusWidth;
            num=ul.children.length-1;
        }
        num--;
        //移动的是ul不是li
        animate(ul,-num*focusWidth)

        //8.点击右侧按钮  小圆圈跟随一起变化  可以在声明一个变量控制小圆圈播放
        circle--;
        //如果circle<0说明第一张图片 则小圆圈要改为第4个小圆圈
        if(circle<0){
            circle=ol.children.length-1;
        }
        circleChange();
    });


    //封装一个函数 改变小圆圈的样式
    function circleChange(){
                //先清除其余小圆圈的current
                for(var i=0;i<ol.children.length;i++){
                    ol.children[i].className='';
                }
                //留下当前的小圆圈的current类
                ol.children[circle].className='current'
    }
})
