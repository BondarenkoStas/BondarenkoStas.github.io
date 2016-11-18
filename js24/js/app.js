requirejs.config({
    paths: {
    	   'model':'modules/model',
    	   'view':'modules/view',
    	   'controller':'modules/controller',
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery',
    },
    shim: {
        "tmpl": {"exports": "tmpl"}
    }
});

requirejs(["jquery", "model", "view", "controller"], function ($, Model, View, Controller) {
    'use strict';
 	var firstToDoList = ['learn js','learn html','make coffee'];
	var model = new Model(firstToDoList);
	var view = new View(model);
	var controller = new Controller(model, view);
});