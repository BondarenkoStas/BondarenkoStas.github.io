module.exports = function(grunt) {

  grunt.initConfig({
  /*---------------------------USEMIN (+COPY,CONCAT,UGLIFY,CSSMIN)*/
    useminPrepare: {
      html: 'src/index.html',
      options: {dest: 'build'}
    },
    usemin:{
      html:['build/index.html']
    },   
    copy:{
      html: {src: 'src/index.html', dest: 'build/index.html'}
    },
  /*-------------------------PRETTY CSS AND JS--------------------*/
    csscomb:{
      dynamic_mappings: {
        expand: true,
        cwd: 'src/css/',
        src: ['*.css', '!*.resorted.css'],
        dest: 'src/css/'
      }
    },
    autoprefixer: {
      dist: {files: {'src/css/style.css':'src/css/style.css'}}
    },
    jsbeautifier : {
      files : ["src/js/*.js", '!src/js/*.min.js'],
      options : {}
    },
  /*-----------------------MINIFICATION IMG, HTML----------------*/
    imagemin: {
      dynamic: {files: [{
        expand: true,
        cwd: 'src/img/',
        src: ['**/*.{png,jpg,gif,svg}'],
        dest: 'build/img'
      }]}
    },
    htmlmin: {
      dist: {
        options: {removeComments: true,collapseWhitespace: true},
        files: {'build/index.html': 'build/index.html'}
      }
    },
  /*----------------------WATCH---------------------------------*/
    watch: {
      options: {livereload: true},
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['jsbeautifier'],
        options: {spawn: false,}
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['csscomb','autoprefixer'],
        options: {spawn: false}
      }
    }
});
  //--------------------FOR USEMIN
  grunt.loadNpmTasks("grunt-usemin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  //--------------------FOR PRETTY
  grunt.loadNpmTasks("grunt-csscomb");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  //--------------------OTHER
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',[
      'csscomb','autoprefixer','jsbeautifier','watch'
    ]);
    grunt.registerTask('build',[
      'csscomb','autoprefixer','jsbeautifier',
      'imagemin',
      'copy:html','useminPrepare','concat','uglify','cssmin','usemin',
      'htmlmin'
    ]);
};


/*

module.exports = function(grunt) {

  grunt.initConfig({
  /*---------------------------USEMIN (+COPY,CONCAT,UGLIFY,CSSMIN)
    useminPrepare: {
      html: 'src/index.html',
      options: {dest: 'build'}
    }
    ,usemin:{
      html:['build/index.html']
    }   
    ,copy:{
      html: {src: 'src/index.html', dest: 'build/index.html'}
    }
  /*-------------------------PRETTY CSS AND JS--------------------
    ,csscomb:{
      dynamic_mappings: {
        expand: true,
        cwd: 'src/css/',
        src: ['*.css', '!*.resorted.css'],
        dest: 'src/css/'
      }
    }
    ,autoprefixer: {
      dist: {files: {'src/css/style.css':'src/css/style.css'}}
    }
    ,jsbeautifier : {
      files : ["src/js/*.js", '!src/js/*.min.js'],
      options : {}
    }
    ,concat: {
      dist:{
        src:['src/css/*.css','!src/css/main.scss']
        ,dest:'src/css/main.css'
      }
    }
    ,sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['main.scss'],
          dest: 'src/css/',
          ext: '.css'
        }]
      }
    }
  /*-----------------------MINIFICATION IMG, HTML----------------
    ,imagemin: {
      dynamic: {files: [{
      	expand: true,
      	cwd: 'src/img/',
      	src: ['**//**.{png,jpg,gif,svg}'],
      	dest: 'build/img'
      }]}
    },
    htmlmin: {
      dist: {
        options: {removeComments: true,collapseWhitespace: true},
        files: {'build/index.html': 'build/index.html'}
      }
    },
  /*----------------------WATCH---------------------------------
    watch: {
      options: {livereload: true},
      scripts: {
      	files: ['src/js/*.js'],
      	tasks: ['jsbeautifier'],
      	options: {spawn: false,}
      },
      css: {
      	files: ['src/css/*.css'],
      	tasks: ['csscomb','autoprefixer'],
      	options: {spawn: false}
      },
      sass: {
        files:['src/css/*.scss'],
        tasks:['concat','sass'],
        options: {spawn: false}
      }
    }
});
  //--------------------FOR USEMIN
  grunt.loadNpmTasks("grunt-usemin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  //--------------------FOR 
  grunt.loadNpmTasks("grunt-csscomb");  
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  //--------------------OTHER
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default',[
      'csscomb','autoprefixer','jsbeautifier','watch'
    ]);
    grunt.registerTask('build',[
      'csscomb','autoprefixer','jsbeautifier',
      'imagemin',
      'copy:html','useminPrepare','uglify','cssmin','usemin',
      'htmlmin'
    ]);
};*/