'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:treeGraph.js
 * @description
 * # treeGraph.js
 */
angular.module('angularApp')
  .directive('treegraph', ['d3', function(d3) {
    return {
      template: '<div></div>',
      restrict: 'E',
      controller: 'TreeCtrl',
      link: function(scope, element, attrs) {
       
          scope.$watch('root', function(){
            if(scope.root && scope.root.children){
              console.log(scope.root);
              draw();
            }
          }); 

        var width = 960,
          height = 1000;

        var cluster = d3.layout.cluster()
          .size([height, width - 160]);

        var diagonal = d3.svg.diagonal()
          .projection(function(d) {
            return [d.y, d.x];
          });

        var svg = d3.select(element[0]).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(40,0)");

        var draw = function() {
          var nodes = cluster.nodes(scope.root),
              links = cluster.links(nodes);

          var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);

          var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", function(d){
              var className = 'node'
              if(d.tsn === +scope.tsn){
                className += " current-node";
                console.log(scope.tsn, d.tsn);
              }
              return className;
            })
            .attr("transform", function(d) {
              return "translate(" + d.y + "," + d.x + ")";
            })

          node.append("circle")
            .attr("r", 9);

          node.append("text")
            .attr("dx", function(d) {
              return d.children ? -8 : 8;
            })
            .attr("dy", 3)
            .style("text-anchor", function(d) {
              return d.children ? "end" : "start";
            })
            .text(function(d) {
              return d.complete_name;
            });
        }

        d3.select(self.frameElement).style("height", height + "px");
      }
    };
  }]);
