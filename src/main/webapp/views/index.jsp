<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8" %>


<html lang="en">
<head>
    <meta name="description" content="Handshake"/>

    <link rel="stylesheet" type="text/css" href="../extjs/resources/css/ext-all-neptune.css"/>
    <!--<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all-gray.css"/>-->
    <link rel="stylesheet" type="text/css" media="screen, projection" href="/css/algorithm.css" />
    <script type="text/javascript" src="../extjs/ext-all-dev.js"></script>
    <script type="text/javascript" src="../extjs/locale/ext-lang-en.js"></script>

    <script type='text/javascript' src='/js/algorithm.js'></script>
    <title>Algorithm</title>
</head>

<body>
<script type="text/javascript">
    (function () {
        function initComponent() {
            var topLogoPanel = Ext.create('Ext.panel.Panel', {
                id: "topLogoPanel",
                bodyStyle: {
                    background: '#3892D3'
                },
                border: false,
                html: '<h1><div style="color:#ffffff;height:40px;line-height:40px;text-indent:60px">Algorithm Final</div></h1>',
                width: window.screen.width * 0.9
            });

            var topInfoPanel = Ext.create('Ext.panel.Panel', {
                id: "topInfoPanel",
                bodyStyle: {
                    background: '#3892D3'
                },
                border: false,
                html: '<div style="color:#ffffff;height:40px;line-height:20px"><br/>Joyce Wang<br/>Ver: 0.1</div>',
                // html: '<div style="color:#4C4C4C;height:40px;"><b style="font-size: 10px;"><i>Welcome back Paul!</i></b><img style="float: left;" src="/images/paulLogin.jpg" alt="Error" width="35" height="35"></div><img style="float: right; margin-bottom: 1px" src="/images/logout.jpg" alt="Error" width="50" height="25">',

                width: window.screen.width * 0.1
            });

            var topBar = Ext.create('Ext.panel.Panel', {
                id: "topBar",
                region: 'north',
                height: '30px',
                border: false,
                bodyStyle: {
                    background: '#FFFFFF'
                },
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [topLogoPanel, topInfoPanel],
                margin: '0 0 3 0'  //top, right, bottom, left
            });

            var mainPanel = Ext.create('Ext.panel.Panel', {
                id: 'mainPanel',
                title: 'Graphic',
                cls: 'panelBackground',
                html: '<div align="center" id="gridDiv"></div>',
                region: 'center',
                width: '70%',
                collapsible: true,
                split: true,
                autoScroll:true,
                margin: '0 0 5 0'

            });

            var controlPanel = Ext.create('Ext.panel.Panel', {
                title: 'Control',
                id: "rightPanel",
                layout: 'vbox',
                width: '10%',
                region: 'east',
                split: true,
                items:[ {
                          xtype      : 'fieldcontainer',
                          layout: 'vbox',
                          items: [
                              {
                                  xtype: 'radiofield',
                                  boxLabel  : 'Start',
                                  name      : 'Menu',
                                  inputValue: 'Start',
                                  id        : 'start'
                              }, {
                                  xtype: 'radiofield',
                                  boxLabel  : 'End',
                                  name      : 'Menu',
                                  inputValue: 'End',
                                  id        : 'end'
                              }, {
                                  xtype: 'radiofield',
                                  boxLabel  : 'Obstacle',
                                  name      : 'Menu',
                                  inputValue: 'Obstacle',
                                  id        : 'obstacle'
                              }, {
                                  xtype: 'radiofield',
                                  boxLabel  : 'Cloud',
                                  name      : 'Menu',
                                  inputValue: 'Cloud',
                                  id        : 'cloud'
                              }
                          ]
                    }, {
                        xtype: 'button',
                        text: 'Go',
                        name : 'go',
                        id :'go',
                        width:150,
                        height: 35,
                        handler: function() {
                            animatePath();
                        }
                    }, {
                    xtype: 'button',
                    text: 'Clear all',
                    name : 'clearAll',
                    id :'clearAll',
                    width:150,
                    height: 35,
                    handler: function() {
                        clearAll();
                    }
                }]

            });

            var mainViewPort = Ext.create('Ext.container.Viewport', {
                layout: 'border',
                items: [topBar, mainPanel, controlPanel],
                renderTo: Ext.getBody()
            });
        }

        Ext.onReady(function () {
            initComponent();
            initializeGraphic(60, 20, 'gridDiv');

            //var test = astarSearch(backendGrid, new Cell(0,0), new Cell(29,29));
            //console.log(test);
        });


    })();
</script>

</body>
</html>