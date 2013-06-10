progression.js
==============

A jQuery plugin that gives users real time hints &amp; progress updates as they complete forms


### Documentation

#### ..:: Getting Started

##### Include the relevant files

Firstly include jQuery and the progression.css and progress.js files.
Place these before `</head>` section

    `<link href='progression.css' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="progression.js"></script>`


##### Create a form

You must give your form a unique ID. You then need to add a data
attribute of `data-progression` to each element that needs to be a step
in the form progression.

The helper text for the tooltip can be set by adding `data-helper` to
the element. This is demonstrated below

    `<form id="myform">
        <p>
            <label for="">Name</label> 
            <input data-progression="" type="text" data-helper="Help users through forms by prividing helpful hinters" name="name" value="" placeholder="" />
        </p>
      </form>`

      ##### Initiate the plugin

Once you have created your form you will need to initiate the plugin.

At its most basic level you can initiate the plugin like:

   `$(document).ready(function ($) {

        $("#myform").progression();

    });`
                            

If you want to initiate the plugin with options then you can do so like:

    `$("#myform").progression({
            tooltipWidth: '200',
            tooltipPosition: 'right',
            tooltipOffset: '50',
            showProgressBar: true,
            showHelper: true,
            tooltipFontSize: '14',
            tooltipFontColor: 'fff',
            progressBarBackground: 'fff',
            progressBarColor: '6EA5E1',
            tooltipBackgroundColor: 'a2cbfa',
            tooltipPadding: '10',
            tooltipAnimate: true
        });  `           


#### ..:: Options

      
