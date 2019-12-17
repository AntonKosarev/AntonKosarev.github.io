Curl request for yii1.1
1) Make sure that the module is connected mod_rewrite.so in php.ini extension=curl
2) Then in main.php

'components'=>array(
        'curl' => array(
            'class' => 'ext.curl.CurlClient',
            'options' => array(
            ),
        ),
        'urlManager'=>array(
            'class'=>'application.extensions.langhandler.ELangCUrlManager',
            'urlFormat'=>'path',
            'showScriptName'=>false,
            'rules'=>array(
                  '/upc'=>'upc/index'
            ),
        ),
   ),