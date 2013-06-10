progression.js
==============

A jQuery plugin that gives users real time hints &amp; progress updates as they complete forms

### Documentation

#### ..:: Getting Started

##### Include the relevant files

Firstly include jQuery and the progression.css and progress.js files.
Place these before `</head>` section

    <link href='progression.css' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="progression.js"></script>
                            

##### Create a form

You must give your form a unique ID. You then need to add a data
attribute of `data-progression` to each element that needs to be a step
in the form progression.

The helper text for the tooltip can be set by adding `data-helper` to
the element. This is demonstrated below

